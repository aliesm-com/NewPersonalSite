import { useState, type SubmitEvent } from 'react';
export default function ContactForm({ email }: { email: string }) {
  const [ready, setReady] = useState(false);
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Portfolio enquiry from ${String(form.get('name')).trim()}`;
    const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(true);
  }
  return (
    <form
      className="contact-form"
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={submit}
    >
      <label htmlFor="contact-name">Your name</label>
      <input
        id="contact-name"
        name="name"
        autoComplete="name"
        placeholder="Your name"
        required
        maxLength={120}
      />
      <label htmlFor="contact-email">Email address</label>
      <input
        id="contact-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />
      <label htmlFor="contact-message">What are you working on?</label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Tell me about your project, idea, or challenge…"
        required
        rows={5}
        maxLength={5000}
      />
      <button className="button" type="submit">
        Open email draft
      </button>
      <p className="form-note">
        Opens your email app with this message. You review and send it there.
      </p>
      {ready && (
        <p role="status" className="form-status">
          Your email draft is ready to open. If your email app didn’t open, write to{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}
