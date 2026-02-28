import mongoose from "mongoose";

interface Igrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  quantity: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const grocerySchema = new mongoose.Schema<Igrocery>(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Fruits & Vegetables", // ফল ও সবজি
        "Dairy & Eggs", // দুগ্ধজাত পণ্য ও ডিম
        "Meat & Fish", // মাছ ও মাংস
        "Cooking Essentials", // রান্নার প্রয়োজনীয় উপকরণ (তেল, চাল, ডাল, লবণ)
        "Beverages", // পানীয় (জুস, কোল্ড ড্রিংকস, চা, কফি)
        "Snacks & Confectionery", // নাস্তা ও মিষ্টি জাতীয় খাবার
        "Bakery & Bread", // বেকারি আইটেম
        "Frozen Foods", // হিমায়িত খাবার
        "Breakfast & Cereal", // সকালের নাস্তা (সিরিয়াল, ওটস)
        "Canned & Dried Foods", // টিনজাত ও শুকনো খাবার
        "Personal Care", // ব্যক্তিগত যত্ন (শ্যাম্পু, সাবান, টুথপেস্ট)
        "Health & Wellness", // স্বাস্থ্য ও ওষুধ
        "Household & Cleaning", // ঘর পরিষ্কারের সামগ্রী
        "Baby Care", // শিশুদের যত্ন (ডায়াপার, বেবি ফুড)
        "Pet Care", // পোষা প্রাণীর খাবার ও যত্ন
        "Home & Kitchen Essentials", // ঘর ও রান্নাঘরের আসবাব বা সরঞ্জাম
      ],
    },
    price: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const GroceryModel =
  mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);

export default GroceryModel;
