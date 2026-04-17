import clientRoutes from "./clientRoutes";
import payRoutes from "./paymentRoutes";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import staffRoutes from "./staffRoutes";
import app from "../..";

app.route("/user", userRoutes)
app.route("/clients", clientRoutes)
app.route("/pays", payRoutes)
app.route("/products", productRoutes)
app.route("/staffs", staffRoutes)