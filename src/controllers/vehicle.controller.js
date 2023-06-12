import Vehicle from "../models/Vehicle.js";

// create a vehicle
export async function createVehicle(req, res) {
  try {
    const { make, model, year } = req.body;
    const { userId } = req.user; // userId is stored in req.user from authentication middleware

    // Create a new vehicle
    const vehicle = await Vehicle.create({
      make,
      model,
      year,
      owner: userId,
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return res.status(500).send("Internal server error");
  }
}
// Get all vehicles
export async function getAllVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find();
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).send("Internal server error");
  }
}

// Get vehicles associated with a user
export async function getVehiclesByUser(req, res) {
  try {
    const { userId } = req.params;

    const vehicles = await Vehicle.find({ owner: userId });

    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the user" });
    }

    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).send("Internal server error");
  }
}

// Get a single vehicle
export async function getVehicleById(req, res) {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return res.status(500).send("Internal server error");
  }
}
// Update a vehicle
export async function updateVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const updateData = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updateData, {
      new: true,
    });

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).send('Internal server error');
  }
}

// Delete a vehicle
export async function deleteVehicle(req, res) {
  try {
    const { vehicleId } = req.params;

    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return res.status(500).send('Internal server error');
  }
}