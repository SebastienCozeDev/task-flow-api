import LogoutSvgIcon from "@/components/icons/logout-svg-icon";
import PencilSvgIcon from "@/components/icons/pencil-svg-icon";
import TrashSvgIcon from "@/components/icons/trash-svg-icon";
import Setting from "@/components/settings/setting";
import SettingList from "@/components/settings/setting-list";

export default function SettingsPage() {
  return (
    <>
      <main className="max-w-screen-lg mx-4 mx-auto w-full mb-24 lg:mt-16 lg:mb-32 gap-6 flex flex-col">
        <SettingList title="General Settings">
          <Setting
            title="Logout"
            description="Sign out of your account and end your current session."
            href="/logout"
            svg={<LogoutSvgIcon />}
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
            svg={<PencilSvgIcon />}
          />
          <Setting
            title="Change Password"
            description="Update your account password."
            href="/change-password"
            svg={<PencilSvgIcon />}
          />
        </SettingList>
        <SettingList title="Danger Zone">
          <Setting
            title="Delete Account"
            description="Permanently remove your account and all associated data."
            href="/delete-account"
            svg={<TrashSvgIcon />}
          />
        </SettingList>
      </main>
    </>
  );
}
