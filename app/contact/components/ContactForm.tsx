"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      console.log("Form submitted:", values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(contactSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[var(--main-darker)]"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border border-[var(--main-light)] px-4 py-2 focus:border-[var(--main-normal)] focus:outline-none focus:ring-1 focus:ring-[var(--main-normal)]"
                  placeholder="Your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--main-darker)]"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-[var(--main-light)] px-4 py-2 focus:border-[var(--main-normal)] focus:outline-none focus:ring-1 focus:ring-[var(--main-normal)]"
                  placeholder="your.email@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[var(--main-darker)]"
                >
                  Phone
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-md border border-[var(--main-light)] px-4 py-2 focus:border-[var(--main-normal)] focus:outline-none focus:ring-1 focus:ring-[var(--main-normal)]"
                  placeholder="+49 123 456 7890"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[var(--main-darker)]"
                >
                  Subject
                </label>
                <Field
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full rounded-md border border-[var(--main-light)] px-4 py-2 focus:border-[var(--main-normal)] focus:outline-none focus:ring-1 focus:ring-[var(--main-normal)]"
                  placeholder="How can we help?"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-[var(--main-darker)]"
              >
                Message
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-md border border-[var(--main-light)] px-4 py-2 focus:border-[var(--main-normal)] focus:outline-none focus:ring-1 focus:ring-[var(--main-normal)]"
                placeholder="Tell us more about your inquiry..."
              />
              <ErrorMessage
                name="message"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[var(--main-darker)] px-6 py-3 text-white transition-colors hover:bg-[var(--main-dark)] disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;