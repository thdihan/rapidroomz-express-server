import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: String, required: true },
    propertyType: { type: String, required: true },
    propertyName: { type: String, required: true },
    selectedRooms: { type: [Schema.Types.Mixed] as any, default: [] },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Refund in Progress", "Refunded"],
      default: "Pending",
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "On Hold", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const BookingModel = model<IBooking>("Booking", BookingSchema);
