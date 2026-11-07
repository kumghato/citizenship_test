'use client';

import { useState, useTransition } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import useWeb3forms from '@web3forms/react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'question-correction',
    country: 'us',
    questionRef: '',
    message: '',
    botcheck: false,
  });

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    process.env.WEB3FORMS_ACCESS_KEY ||
    '';

  const { submit } = useWeb3forms({
    access_key: accessKey,
    settings: {
      from_name: 'CivicPass Support',
      subject: 'New Inquiry from CivicPass Portal',
    },
    onSuccess: () => {
      setStatus('success');
    },
    onError: (message) => {
      setStatus('error');
      setErrorMessage(message || 'Failed to submit message. Please try again or email us directly.');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      // Spam honeypot triggered
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    if (!accessKey) {
      setStatus('error');
      setErrorMessage('Web3Forms access key is missing. Please configure NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your .env file.');
      return;
    }

    startTransition(async () => {
      try {
        await submit({
          name: formData.name.trim(),
          email: formData.email.trim(),
          category: formData.category,
          country: formData.country,
          questionRef: formData.questionRef.trim(),
          message: formData.message.trim(),
          subject: `CivicPass Inquiry: [${formData.country.toUpperCase()}] ${formData.category.replace('-', ' ').toUpperCase()}`,
        });
      } catch {
        setStatus('error');
        setErrorMessage('Failed to submit message. Please check your network connection and try again.');
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
              botcheck: false,
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
      {/* Honeypot field for bot protection */}
      <input
        type="checkbox"
        name="botcheck"
        checked={formData.botcheck}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

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
