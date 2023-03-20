import { TaskStatus } from "lib/type/View";

export interface Properties {
  name: string;
  startTime?: Date;
  endTime?: Date;
  status?: TaskStatus;
  blocking?: string;
  blockedBy?: string;
  content: string;
  assignee?: string;
}
