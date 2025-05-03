import React from 'react';

export default function TermsConditions() {
  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 border-l-8 border-[#3B42D2] animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3B42D2] mb-8 text-center">Terms & Conditions</h1>
        <p className="text-gray-600 mb-6 text-lg text-center max-w-3xl mx-auto">
          Please read these terms carefully before using our platform. By using our service, you agree to these terms.
        </p>

        <div className="space-y-8 text-gray-800 text-base leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using our platform, you agree to be legally bound by these terms. If you do not agree, please do not use the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">2. Modifications</h2>
            <p>
              We may update these terms at any time without prior notice. Your continued use after changes means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">3. Proper Use</h2>
            <p>
              You agree to use the service responsibly. Spamming, uploading malicious content, or violating any applicable law is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">4. Food & Donations</h2>
            <p>
              You are responsible for ensuring any donated food is safe and consumable. We reserve the right to remove any listings that don’t meet our safety guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">5. Liability Disclaimer</h2>
            <p>
              We are not liable for any damages or issues arising from user interactions or donations. Users act at their own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">6. Account Suspension</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate our policies or behave maliciously on the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B42D2] mb-2">7. Jurisdiction</h2>
            <p>
              These terms are governed by the laws of our jurisdiction. Any legal disputes will be handled in the courts of that jurisdiction.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          Last updated: May 3, 2025
        </div>
      </div>
    </section>
  );
}
