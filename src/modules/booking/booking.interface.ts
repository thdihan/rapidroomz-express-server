import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  bookingId: string;
  userId: Types.ObjectId;
  propertyId: string;
  propertyType: string;
  propertyName: string;
  selectedRooms: any[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refund in Progress" | "Refunded";
  totalAmount: number;
  status: "Pending" | "Confirmed" | "On Hold" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}
