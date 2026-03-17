"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, X, AlertCircle } from "lucide-react";
import { z } from "zod";

// ─── Zod Schema ────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be under 500 characters"),
});

type FormFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string; // anti-spam
};

type FieldErrors = Partial<Record<keyof Omit<FormFields, "honeypot">, string>>;

// ─── Data ──────────────────────────────────────────────────────────────────────

const AGENCY_SERVICES = [
  "Web & Software Development",
  "AI-based Solutions",
  "Mobile App Development",
  "UI/UX Strategy",
  "Cloud & DevOps",
  "Digital Marketing",
];



// ─── Toast System ─────────────────────────────────────────────────────────────

type ToastType = "success" | "error";
type ToastItem = { id: number; message: string; type: ToastType };

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const push = useCallback((message: string, type: ToastType = "error") => {
    const id = ++counter.current;
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 5000);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  return { toasts, push, remove };
}

function ToastPortal({
  toasts,
  remove,
}: {
  toasts: ToastItem[];
  remove: (id: number) => void;
}) {
  return (
    <div className="fixed top-5 right-5 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-[14px] min-w-[280px] max-w-[360px]"
            style={{
              background: "rgba(10,10,11,0.97)",
              border: `1px solid ${t.type === "error" ? "rgba(255,90,90,0.35)" : "rgba(0,182,99,0.35)"}`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 16px 50px rgba(0,0,0,0.55), 0 0 0 1px ${t.type === "error" ? "rgba(255,90,90,0.08)" : "rgba(0,182,99,0.08)"}`,
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {t.type === "error" ? (
                <AlertCircle size={15} style={{ color: "#ff6b6b" }} />
              ) : (
                <CheckCircle2 size={15} style={{ color: "#00B663" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-0.5"
                style={{ color: t.type === "error" ? "#ff6b6b" : "#00B663" }}>
                {t.type === "error" ? "Error" : "Success"}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t.message}
              </p>
            </div>
            <button
              onClick={() => remove(t.id)}
              className="flex-shrink-0 mt-0.5 opacity-40 hover:opacity-80 transition-opacity"
            >
              <X size={13} style={{ color: "#fff" }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Confirmation Modal ────────────────────────────────────────────────────────

function ConfirmationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
            style={{ backdropFilter: "blur(24px)", background: "rgba(0,0,0,0.65)" }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="w-full max-w-[600px] rounded-[22px] relative overflow-hidden pointer-events-auto"
              style={{
                background: "rgba(10,10,11,0.97)",
                border: "1px solid rgba(0,182,99,0.2)",
                boxShadow: "0 48px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute top-0 left-[15%] right-[15%] h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,182,99,0.6), transparent)" }}
              />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,182,99,0.12) 0%, transparent 65%)", filter: "blur(20px)" }}
              />
              <div className="relative px-10 py-14 text-center">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <X size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
                </button>
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                  className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center mx-auto mb-8"
                  style={{ background: "rgba(0,182,99,0.1)", border: "1.5px solid rgba(0,182,99,0.3)" }}
                >
                  <CheckCircle2 size={40} style={{ color: "#00B663" }} />
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "rgba(0,182,99,0.15)", animationDuration: "2s" }}
                  />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="text-[32px] font-bold text-white mb-4 tracking-tight"
                >
                  Thank you.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="text-base leading-relaxed max-w-[400px] mx-auto"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  An Agency Strategist will review your project and respond within{" "}
                  <span style={{ color: "#00B663", fontWeight: 600 }}>24 hours</span>.
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.48, duration: 0.5 }}
                  className="my-8 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52 }}
                  className="flex items-center justify-center gap-4 flex-wrap"
                >
                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-[12px] text-sm font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: "#00B663", color: "#00203F", boxShadow: "0 8px 28px rgba(0,182,99,0.3)" }}
                  >
                    Done
                  </button>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-[12px] text-sm font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: "rgba(0,182,99,0.07)", border: "1.5px solid rgba(0,182,99,0.2)", color: "#00B663" }}
                  >
                    Send Another
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── WaveLoader ────────────────────────────────────────────────────────────────

function WaveLoader() {
  return (
    <span className="flex items-end gap-[3px] h-[14px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: "#00203F", animation: `codo-wave 0.9s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </span>
  );
}

// ─── Main Form Component ──────────────────────────────────────────────────────

export default function ContactForm() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<FormFields>({
    name: "", email: "", phone: "", service: "", message: "", honeypot: "",
  });
  const { toasts, push, remove } = useToast();

  const services = AGENCY_SERVICES;

  const requiredFilled =
    form.name.trim().length >= 2 &&
    form.email.includes("@") &&
    form.service.length > 0 &&
    form.message.trim().length >= 10;
  const hasErrors = Object.values(errors).some(Boolean);
  const canSubmit = requiredFilled && !hasErrors;

  const validateField = useCallback(
    (field: keyof Omit<FormFields, "honeypot">, value: string) => {
      const shape = contactSchema.shape as Record<string, z.ZodTypeAny>;
      if (!shape[field]) return;
      const result = shape[field].safeParse(value);
      setErrors((prev) => ({
        ...prev,
        [field]: result.success ? undefined : result.error.issues[0]?.message,
      }));
    },
    []
  );

  const handleBlur = (field: keyof Omit<FormFields, "honeypot">) => {
    setTouched((p) => ({ ...p, [field]: true }));
    validateField(field, form[field]);
  };

  const handleChange = (field: keyof Omit<FormFields, "honeypot">, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;

    const result = contactSchema.safeParse({
      name: form.name, email: form.email, phone: form.phone, service: form.service, message: form.message,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof FieldErrors] = issue.message;
      });
      setErrors(fieldErrors);
      setTouched({ name: true, email: true, phone: true, service: true, message: true });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => { Math.random() > 0.05 ? resolve() : reject(new Error("Network error")); }, 1800);
      });
      setIsSubmitting(false);
      setShowModal(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "", honeypot: "" });
      setErrors({});
      setTouched({});
    } catch {
      setIsSubmitting(false);
      push("Unable to reach server. Please try again.", "error");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <ToastPortal toasts={toasts} remove={remove} />
      <ConfirmationModal open={showModal} onClose={handleModalClose} />

      <div
        className="rounded-[28px] border relative overflow-hidden h-full"
        style={{
          background: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,182,99,0.5), transparent)" }} />

        <div className="px-7 py-10 sm:px-12 sm:py-12 flex flex-col justify-center h-full">
          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            <div aria-hidden="true" style={{ position: "absolute", opacity: 0, height: 0, width: 0, overflow: "hidden", pointerEvents: "none" }} tabIndex={-1}>
              <label htmlFor="website">Website</label>
              <input
                id="website" name="website" type="text" autoComplete="off" tabIndex={-1}
                value={form.honeypot} onChange={(e) => setForm((p) => ({ ...p, honeypot: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="Full Name" placeholder="John Doe" value={form.name} onChange={(v) => handleChange("name", v)} onBlur={() => handleBlur("name")} error={touched.name ? errors.name : undefined} required />
              <FloatingInput label="Email Address" type="email" placeholder="john@example.com" value={form.email} onChange={(v) => handleChange("email", v)} onBlur={() => handleBlur("email")} error={touched.email ? errors.email : undefined} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="Phone Number" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={(v) => handleChange("phone", v)} onBlur={() => handleBlur("phone")} error={touched.phone ? errors.phone : undefined} />
              <ServiceSelect services={services} value={form.service} onChange={(v) => { setForm((p) => ({ ...p, service: v })); setTouched((p) => ({ ...p, service: true })); setErrors((p) => ({ ...p, service: undefined })); }} error={touched.service ? errors.service : undefined} />
            </div>

            <MessageTextarea value={form.message} onChange={(v) => handleChange("message", v)} onBlur={() => handleBlur("message")} error={touched.message ? errors.message : undefined} />

            <div className="flex justify-center w-full">
              <motion.button
                type="submit"
                whileHover={canSubmit && !isSubmitting ? { scale: 1.012 } : {}}
                whileTap={canSubmit && !isSubmitting ? { scale: 0.985 } : {}}
                disabled={!canSubmit || isSubmitting}
                className="group relative w-full sm:w-auto px-6 sm:px-16 py-[14px] sm:py-[16px] rounded-[14px] font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] overflow-hidden flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  background: !canSubmit ? "rgba(0,182,99,0.2)" : isSubmitting ? "rgba(0,182,99,0.45)" : "linear-gradient(135deg, #00B663 0%, #00cc6f 100%)",
                  color: !canSubmit ? "rgba(255,255,255,0.25)" : "#00203F",
                  opacity: !canSubmit ? 0.5 : 1,
                  pointerEvents: !canSubmit || isSubmitting ? "none" : "auto",
                  boxShadow: canSubmit && !isSubmitting ? "0 8px 32px rgba(0,182,99,0.3), 0 2px 8px rgba(0,0,0,0.3)" : "none",
                  cursor: !canSubmit || isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {canSubmit && !isSubmitting && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }} />
                )}
                {isSubmitting ? (
                  <><WaveLoader /><span style={{ color: "#00203F" }}>Sending…</span></>
                ) : (
                  <>
                    <span className="relative z-10">Send Proposal Request</span>
                    <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                        <path d="M480-160 446-194l252-252H160v-68h538L446-766l34-34 320 320-320 320Z"/>
                      </svg>
                    </div>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// ─── Input Components ─────────────────────────────────────────────────────────

function FloatingInput({ label, placeholder, type = "text", value, onChange, onBlur, error, required }: {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const borderColor = error ? "rgba(255,90,90,0.65)" : focused ? "rgba(0,182,99,0.65)" : "rgba(255,255,255,0.07)";
  const shadowStyle = error ? "0 0 0 4px rgba(255,90,90,0.08), 0 8px 30px rgba(0,0,0,0.2)" : focused ? "0 0 0 4px rgba(0,182,99,0.08), 0 8px 30px rgba(0,0,0,0.2)" : "none";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative rounded-[14px] transition-all duration-300 flex items-center h-[58px]" style={{ background: "rgba(255,255,255,0.03)", border: `1.5px solid ${borderColor}`, boxShadow: shadowStyle }}>
        <label className="absolute left-4 pointer-events-none font-semibold transition-all duration-200" style={{ top: lifted ? "10px" : "50%", transform: lifted ? "none" : "translateY(-50%)", fontSize: lifted ? "9px" : "13px", letterSpacing: lifted ? "0.2em" : "0", textTransform: lifted ? "uppercase" : "none", color: error ? "rgba(255,90,90,0.9)" : focused ? "rgba(0,182,99,0.9)" : lifted ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.22)" }}>
          {label}{required && <span style={{ color: "#00B663", marginLeft: 2 }}>*</span>}
        </label>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); onBlur?.(); }} autoComplete="off" required={required} placeholder={focused ? placeholder : ""} className="w-full h-full bg-transparent outline-none text-sm text-white px-4 pb-2" style={{ paddingTop: lifted ? "16px" : "0" }} aria-invalid={!!error} />
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex items-center gap-1.5 text-[10px] font-semibold pl-1" style={{ color: "rgba(255,90,90,0.85)" }}><AlertCircle size={10} />{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

function ServiceSelect({ services, value, onChange, error }: {
  services: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setFocused(false); } };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const borderColor = error ? "rgba(255,90,90,0.65)" : focused || open ? "rgba(0,182,99,0.65)" : "rgba(255,255,255,0.07)";
  const lifted = focused || open || value.length > 0;

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="relative">
        <div className="rounded-[14px] cursor-pointer transition-all duration-300 select-none relative h-[58px] flex items-center" style={{ background: "rgba(255,255,255,0.03)", border: `1.5px solid ${borderColor}`, boxShadow: focused || open ? `0 0 0 4px rgba(0,182,99,0.08), 0 8px 30px rgba(0,0,0,0.2)` : error ? "0 0 0 4px rgba(255,90,90,0.08)" : "none" }} onClick={() => { setOpen(!open); setFocused(true); }}>
          <label className="absolute left-4 pointer-events-none font-semibold transition-all duration-200" style={{ top: lifted ? "10px" : "50%", transform: lifted ? "none" : "translateY(-50%)", fontSize: lifted ? "9px" : "13px", letterSpacing: lifted ? "0.2em" : "0", textTransform: lifted ? "uppercase" : "none", color: error ? "rgba(255,90,90,0.9)" : focused || open ? "rgba(0,182,99,0.9)" : lifted ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.22)" }}>
            Service Inquiry <span style={{ color: "#00B663", marginLeft: 2 }}>*</span>
          </label>
          
          <div className="w-full h-full bg-transparent flex items-center text-sm text-white px-4" style={{ paddingTop: lifted ? "16px" : "0", paddingRight: "40px" }}>
            <span style={{ color: value ? "rgba(255,255,255,0.88)" : "transparent", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value || "Select a service"}</span>
          </div>
          
          <motion.div 
            animate={{ rotate: open ? 180 : 0 }} 
            transition={{ duration: 0.22, ease: "easeInOut" }} 
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            style={{ width: 24, height: 24, transformOrigin: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" style={{ color: "rgba(255,255,255,0.45)", display: "block" }}>
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
            </svg>
          </motion.div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.2 }} className="absolute left-0 right-0 top-[calc(100%+6px)] rounded-[14px] border overflow-hidden z-50" style={{ background: "rgba(10,12,18,0.97)", borderColor: "rgba(0,182,99,0.2)", backdropFilter: "blur(24px)", boxShadow: "0 20px 60px rgba(0,0,0,0.65)" }}>
              {services.map((s: string) => (
                <ServiceOption key={s} label={s} selected={value === s} onSelect={() => { onChange(s); setOpen(false); setFocused(false); }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex items-center gap-1.5 text-[10px] font-semibold pl-1" style={{ color: "rgba(255,90,90,0.85)" }}><AlertCircle size={10} />{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

function ServiceOption({ label, selected, onSelect }: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="px-4 py-3 text-sm cursor-pointer flex items-center gap-3 transition-all duration-150" style={{ color: selected ? "#00B663" : "rgba(255,255,255,0.65)", background: selected ? "rgba(0,182,99,0.07)" : hovered ? "rgba(255,255,255,0.04)" : "transparent" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onSelect}>
      <span className="w-[14px] flex-shrink-0 flex items-center justify-center">{selected && <CheckCircle2 size={13} style={{ color: "#00B663" }} />}</span>{label}
    </div>
  );
}

function MessageTextarea({ value, onChange, onBlur, error }: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const MAX = 500;
  const pct = Math.round((value.length / MAX) * 100);
  const borderColor = error ? "rgba(255,90,90,0.65)" : focused ? "rgba(0,182,99,0.65)" : "rgba(255,255,255,0.07)";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="rounded-[14px] transition-all duration-300" style={{ background: "rgba(255,255,255,0.03)", border: `1.5px solid ${borderColor}`, boxShadow: focused ? "0 0 0 4px rgba(0,182,99,0.08), 0 8px 30px rgba(0,0,0,0.2)" : error ? "0 0 0 4px rgba(255,90,90,0.08)" : "none" }}>
        <div className="px-4 pt-3.5"><p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: error ? "rgba(255,90,90,0.9)" : focused ? "rgba(0,182,99,0.9)" : "rgba(255,255,255,0.3)" }}>Your Message</p></div>
        <textarea value={value} onChange={(e) => onChange(e.target.value.slice(0, MAX))} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); onBlur?.(); }} rows={5} placeholder="Tell us about your project, goals, timeline…" className="codo-scrollbar w-full bg-transparent outline-none text-sm text-white px-4 pb-3 resize-none placeholder:text-white/20" aria-invalid={!!error} />
        <div className="px-4 pb-3 flex items-center gap-3">
          <div className="flex-1 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: pct > 90 ? "#ff6b6b" : "#00B663", opacity: value.length ? 1 : 0 }} />
          </div>
          <span className="text-[10px] font-mono flex-shrink-0" style={{ color: pct > 90 ? "#ff6b6b" : "rgba(255,255,255,0.22)" }}>{value.length}/{MAX}</span>
        </div>
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex items-center gap-1.5 text-[10px] font-semibold pl-1" style={{ color: "rgba(255,90,90,0.85)" }}><AlertCircle size={10} />{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}
