import Owner from "../models/owners.model.js";

// create a owner
export async function createOwner(req, res) {
  try {
    const { firstName, lastName, phone, address,nationalId } = req.body;
    const { userId } = req.user; // userId is stored in req.user from authentication middleware

    // Create a new owner
    const owner = await Owner.create({
      firstName,
      lastName,
      phone,
      address,
      nationalId,
      createdBy: userId,
    });

    return res.status(201).json(owner);
  } catch (error) {
    console.error("Error creating owner:", error);
    return res.status(500).send("Internal server error");
  }
}
// Get all owners
export async function getAllOwners(req, res) {
  try {
    const owners = await Owner.find();
    return res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    return res.status(500).send("Internal server error");
  }
}

// Get owners associated with a user
export async function getOwnersByUser(req, res) {
  try {
    const { userId } = req.params;

    const owners = await Owner.find({ createdBy: userId });

    if (owners.length === 0) {
      return res
        .status(404)
        .json({ message: "No owners found for the user" });
    }

    return res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    return res.status(500).send("Internal server error");
  }
}

// Get a single owner
export async function getOwnerById(req, res) {
  try {
    const { ownerId } = req.params;

    const owner = await Owner.findById(ownerId);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    return res.status(200).json(owner);
  } catch (error) {
    console.error("Error fetching owner:", error);
    return res.status(500).send("Internal server error");
  }
}
// Update a owner
export async function updateOwner(req, res) {
  try {
    const { ownerId } = req.params;
    const updateData = req.body;

    const updatedOwner = await Owner.findByIdAndUpdate(
      ownerId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    return res.status(200).json(updatedOwner);
  } catch (error) {
    console.error("Error updating owner:", error);
    return res.status(500).send("Internal server error");
  }
}

// Delete a owner
export async function deleteOwner(req, res) {
  try {
    const { ownerId } = req.params;

    const deletedOwner = await Owner.findByIdAndDelete(ownerId);

    if (!deletedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    return res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    console.error("Error deleting owner:", error);
    return res.status(500).send("Internal server error");
  }
}
