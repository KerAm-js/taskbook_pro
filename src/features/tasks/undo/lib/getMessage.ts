import { TTaskActionType } from "@/entities/task";

export const getMessage = (type: TTaskActionType | undefined) => {
  switch (type) {
    case "changeDate": {
      return "dateChanged";
    }
    case "deleteOne": {
      return "taskDeleted";
    }
    case "deleteMany": {
      return "tasksDeleted";
    }
    case "copyOne": {
      return "taskAdded";
    }
    case "copyMany": {
      return "tasksAdded";
    }
    default:
      return "";
  }
};
