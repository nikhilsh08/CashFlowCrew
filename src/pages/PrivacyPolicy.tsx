import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Consent
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                By using our website, you hereby consent to our Privacy Policy
                and agree to its terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to
                you at the point we ask you to provide your personal
                information.
              </p>
              <p>
                If you contact us directly, we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
              </p>
              <p>
                When you register for an Account, we may ask for your contact
                information, including items such as name, address, email
                address, and telephone number.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>
                  Develop new products, services, features, and functionality
                </li>
                <li>
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes
                </li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Log Files & Cookies
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                cashflowcrew.in website may use cookies to store visitors'
                preferences; record user-specific information on what pages
                users access or visit; ensure that visitors are not repeatedly
                sent the same banner ads; or to customize website content based
                on visitors' browser type or other information that the visitor
                may send to us.
              </p>
              <p>
                Google is one of a third-party vendor on our site. It also uses
                cookies, known as DART cookies, to serve ads to our site
                visitors based upon their visit to cashflowcrew.in and other
                sites on the internet. However, visitors may choose to decline
                the use of DART cookies by visiting the Google ad and content
                network Privacy Policy at{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  className="text-indigo-600 hover:underline"
                >
                  https://policies.google.com/technologies/ads
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Advertising Partners
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Some advertisers on our site may use cookies and web beacons.
                Our advertising partners are listed below. Each of our
                advertising partners has their own Privacy Policy for their
                policies on user data.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Google:{" "}
                  <a
                    href="https://policies.google.com/technologies"
                    className="text-indigo-600 hover:underline"
                  >
                    https://policies.google.com/technologies
                  </a>
                </li>
              </ul>
              <p>
                Third-party ad servers or ad networks uses technologies like
                cookies, JavaScript, or Web Beacons that are used in their
                respective advertisements and links that appear on
                cashflowcrew.in, which are sent directly to users' browser. They
                automatically receive your IP address when this occurs. These
                technologies are used to measure the effectiveness of their
                advertising campaigns and/or to personalize the advertising
                content that you see on websites that you visit.
              </p>
              <p>
                Note that cashflowcrew.in has no access to or control over these
                cookies that are used by third-party advertisers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              GDPR Data Protection Rights
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We would like to make sure you are fully aware of all of your
                data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>The right to access</strong> – You have the right to
                  request copies of your personal data. We may charge you a
                  small fee for this service.
                </li>
                <li>
                  <strong>The right to rectification</strong> – You have the
                  right to request that we correct any information you believe
                  is inaccurate. You also have the right to request that we
                  complete the information you believe is incomplete.
                </li>
                <li>
                  <strong>The right to erasure</strong> – You have the right to
                  request that we erase your personal data, under certain
                  conditions.
                </li>
                <li>
                  <strong>The right to restrict processing</strong> – You have
                  the right to request that we restrict the processing of your
                  personal data, under certain conditions.
                </li>
                <li>
                  <strong>The right to object to processing</strong> – You have
                  the right to object to our processing of your personal data,
                  under certain conditions.
                </li>
                <li>
                  <strong>The right to data portability</strong> – You have the
                  right to request that we transfer the data that we have
                  collected to another organization, or directly to you, under
                  certain conditions.
                </li>
              </ul>
              <p>
                If you make a request, we have one month to respond to you. If
                you would like to exercise any of these rights, please contact
                us at support@cashflowcrew.in.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Children's Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Another part of our priority is adding protection for children
                while using the internet. We encourage parents and guardians to
                observe, participate in, and/or monitor and guide their online
                activity.
              </p>
              <p>
                cashflowcrew.in does not knowingly collect any Personal
                Identifiable Information from children under the age of 16. If
                you think that your child provided this kind of information on
                our website, we strongly encourage you to contact us immediately
                and we will do our best efforts to promptly remove such
                information from our records.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                cashflowcrew.in is operated by Nikhil Sharma, an individual
                based in India. Nikhil Sharma shall be the controller of the
                personal data/information which may be collected from you or
                which may be processed, in relation to the Services/Website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Personal Data Transfers
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Your data/information is processed on cloud Servers in India.
                However, your data/Information may be even stored, transferred
                or transmitted over, and used, in such locations outside of your
                state, region, county, province, country or other
                governmental/state jurisdiction where the privacy laws may not
                be as stringent or protective as the privacy laws in your
                jurisdiction.
              </p>
              <p>
                Your data/Information may be subject to the local laws of the
                jurisdictions within which it is being collected, stored, used
                and/or disclosed and may be accessed by courts, law enforcement
                agencies, regulatory agencies and/or statutory authorities in
                such jurisdictions. In all such cases in the foregoing, by using
                or accessing the Service/website, you hereby unconditionally
                give your consent to the access, storage, transfer, transmission
                of your data/Information and the usage and disclosure of your
                data/information in all respects whatsoever.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Disclosure of Your Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We may share your information with third parties to whom you ask
                us to send your information.
              </p>
              <p>
                We may disclose your personal data if required to do so by law
                or in the good faith belief that such action is necessary in
                urgent circumstances to protect the personal safety of users of
                the website or the public or to protect against legal liability
                including to resolve disputes, investigate problems, or enforce
                our policies/agreements.
              </p>
              <p>
                We may share information with our third-party service providers
                (such as credit card processors, managed cloud hosting providers
                like Amazon Web Services) for the purpose of providing the
                requisite hardware, software, networking, storage, and other
                services which we use.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Payment Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We use 256 BIT bit level of SSL standard data protection
                practices and technologies, and your data is therefore protected
                in the course of transmission. Your data security is important
                to us, however as no method of transmission over the internet or
                any method of electronic storage is completely secure, we cannot
                guarantee you absolute security of your data.
              </p>
              <p>
                We use services of third-party service providers such as Stripe,
                PayPal, PayU, Cashfree, PayTM, Razorpay etc. for our products
                and services. At no time is your banking information passed to
                the website from any of these third-party providers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Updates to This Privacy Policy
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We reserve the right to update and modify this Privacy Policy
                any time and from time to time without prior notice. We will
                update the effective date in the Privacy Policy.
              </p>
              <p>
                Please read and visit our Privacy Policy every time for any
                changes, alterations, modifications etc. Changes to this Privacy
                Policy are effective when they are posted on this page of the
                Privacy Policy or made effective as per the changes.
              </p>
              <p>
                We request you to please review this Privacy Policy
                periodically, and especially before you provide any personal
                data. Your continued use of the website after any changes or
                revisions to this Privacy Policy shall indicate your agreement
                with the terms of such revised Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you have any questions or concerns regarding this Privacy
                Policy, you may reach out to us at:
              </p>
              <p>
                Email: support@cashflowcrew.in
                <br />
                Phone: +91-9902366044
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
