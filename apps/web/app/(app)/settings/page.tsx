import Setting from "@/components/settings/setting";
import SettingList from "@/components/settings/setting-list";

export default function SettingsPage() {
  return (
    <>
      <main className="max-w-screen-lg mx-4 mx-auto w-full mb-16 lg:mt-16 lg:mb-32">
        <SettingList title="General Settings">
          <Setting
            title="Logout"
            description="Sign out of your account and end your current session."
            href="/logout"
            svg={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[1.2em]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            }
          />
          <Setting
            title="Terms of Use"
            description="Review the legal terms and conditions governing your use of TaskFlow."
            href="/terms-of-use"
          />
          <Setting
            title="Privacy Policy"
            description="Learn how we collect, use, and protect your personal information."
            href="/privacy-policy"
          />
          <Setting
            title="Cookie Policy"
            description="Understand the cookies we use and your preferences for managing them."
            href="/cookie-policy"
          />
          <Setting
            title="Legal Notices"
            description="Read important legal information and regulatory notices."
            href="/legal-notices"
          />
          <Setting
            title="Disclaimer"
            description="View our disclaimer regarding service limitations and liabilities."
            href="/disclaimer"
          />
        </SettingList>
      </main>
    </>
  );
}
