import BoardSvgIcon from "@/components/icons/board-svg-icon";
import SettingsSvgIcon from "@/components/icons/settings-svg-icon";
import TasksSvgIcon from "@/components/icons/tasks-svg-icon";
import { ReactElement } from "react";

type Route = {
  title: string;
  link: string;
  svg: ReactElement;
};

export const homeRoutes: Route[] = [
  {
    title: "Boards",
    link: "/",
    svg: <BoardSvgIcon />,
  },
  {
    title: "Tasks",
    link: "/tasks",
    svg: <TasksSvgIcon />,
  },
  {
    title: "Settings",
    link: "/settings",
    svg: <SettingsSvgIcon />,
  }
];
