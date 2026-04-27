import { CheckCircle } from "lucide-react";

function ContactForm() {
  return (
        <form
          action="https://formsubmit.co/c563775632c193a035157c933aec30f2"
          method="POST"
          name="contact"
          className="space-y-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your First Name"
              name="firstname"
              required
              className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,33,.96),rgba(16,22,45,.76))] px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-violet-400/60 focus:shadow-[0_0_0_1px_rgba(167,139,250,.2),0_0_26px_rgba(99,102,241,.18)]"
            />
            <input
              type="text"
              placeholder="Your Last Name"
              name="lastname"
              required
              className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,33,.96),rgba(16,22,45,.76))] px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-violet-400/60 focus:shadow-[0_0_0_1px_rgba(167,139,250,.2),0_0_26px_rgba(99,102,241,.18)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="tel"
              placeholder="Phone Number"
              name="tel"
              className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,33,.96),rgba(16,22,45,.76))] px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-violet-400/60 focus:shadow-[0_0_0_1px_rgba(167,139,250,.2),0_0_26px_rgba(99,102,241,.18)]"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
              className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,33,.96),rgba(16,22,45,.76))] px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-violet-400/60 focus:shadow-[0_0_0_1px_rgba(167,139,250,.2),0_0_26px_rgba(99,102,241,.18)]"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            name="subject"
            className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,33,.96),rgba(16,22,45,.76))] px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-violet-400/60 focus:shadow-[0_0_0_1px_rgba(167,139,250,.2),0_0_26px_rgba(99,102,241,.18)]"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Type your message"
            className="w-full resize-none rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,33,.96),rgba(16,22,45,.76))] px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-violet-400/60 focus:shadow-[0_0_0_1px_rgba(167,139,250,.2),0_0_26px_rgba(99,102,241,.18)]"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl border border-violet-300/20 bg-[linear-gradient(135deg,#5464ff_0%,#7d6dff_35%,#de6bc6_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_34px_rgba(108,92,255,.45),0_0_22px_rgba(113,130,255,.38)] transition hover:scale-[1.02]"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Send Message
            </button>
          </div>
        </form>
  );
}

export default ContactForm;