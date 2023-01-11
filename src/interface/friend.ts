export interface Friend {
  userId: string;
  friendStatus: "pending" | "accept" | "decline";
  requestStatus: "sent" | "receive";
  firstName: string;
  lastName: string;
  userName: string;
}
