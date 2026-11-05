'use client';

import { useState, useTransition } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'question-correction',
    country: 'us',
    questionRef: '',
    message: '',
  });

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    startTransition(async () => {
      try {
        // Simulate immediate response acknowledgment
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus('success');
      } catch {
        setStatus('error');
        setErrorMessage('Failed to submit message. Please try again or email us directly.');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="form-feedback form-feedback--success" style={{ padding: 28, borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <CheckCircle2 size={22} color="#165b39" />
          <strong style={{ fontSize: 16 }}>Message Received — Thank You!</strong>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Thank you for reaching out to CivicPass. Our editorial and support team has received your message regarding{' '}
          <strong>{formData.category.replace('-', ' ')}</strong>. We typically review and respond to inquiries within 24 to 48 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              category: 'question-correction',
              country: 'us',
              questionRef: '',
              message: '',
            });
            setStatus('idle');
          }}
          className="button-secondary"
          style={{ marginTop: 20, minHeight: 38, fontSize: 13 }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div className="form-feedback form-feedback--error" role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={18} color="#9b1c1c" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Your Name <span className="req">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="form-input"
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="req">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-input"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Inquiry Category <span className="req">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="question-correction">Question Correction / Audit</option>
            <option value="technical-support">Technical Issue or Bug</option>
            <option value="general-inquiry">General Question</option>
            <option value="press-partnership">Press or Academic Partnership</option>
            <option value="privacy-request">Privacy / Data Request</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">
            Exam Track
          </label>
          <select
            id="country"
            name="country"
            className="form-select"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="us">🇺🇸 United States (USCIS Civics)</option>
            <option value="uk">🇬🇧 United Kingdom (Life in the UK)</option>
            <option value="ca">🇨🇦 Canada (Discover Canada)</option>
            <option value="au">🇦🇺 Australia (Our Common Bond)</option>
            <option value="general">🌐 General Platform</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="questionRef" className="form-label">
          Question ID or Handbook Topic <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400 }}>(Optional)</span>
        </label>
        <input
          id="questionRef"
          name="questionRef"
          type="text"
          className="form-input"
          placeholder="e.g. US-Q42 or 'Governor of California' or 'Magna Carta'"
          value={formData.questionRef}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Your Message <span className="req">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="form-textarea"
          placeholder="Describe your question, correction, or feedback with as much detail as possible..."
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="button-primary"
        style={{ width: '100%', marginTop: 8 }}
      >
        {isPending ? (
          'Submitting message...'
        ) : (
          <>
            <Send size={15} />
            <span>Submit Message to Editorial Team</span>
          </>
        )}
      </button>

      <span style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', display: 'block' }}>
        We respect your privacy. Inquiries are handled privately under our <a href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</a>.
      </span>
    </form>
  );
}

export default ContactForm;
