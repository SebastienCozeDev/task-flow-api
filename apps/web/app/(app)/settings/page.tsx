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
        <SettingList title="Account Settings">
          <Setting
            title="Edit Profile"
            description="Update your personal information and preferences."
            href="/edit-profile"
          />
          <Setting
            title="Change Password"
            description="Update your account password."
            href="/change-password"
          />
        </SettingList>
        <SettingList title="Danger Zone">
          <Setting
            title="Delete Account"
            description="Permanently remove your account and all associated data."
            href="/delete-account"
            svg={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[1.2em]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            }
          />
        </SettingList>
      </main>
    </>
  );
}
