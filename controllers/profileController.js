import User from '../models/userModel.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const profileName = req.query.profileName; 
    
    if (!profileName) {
      return res.status(400).json({ message: 'Profile name is required' });
    }
    
    const user = await User.findById(userId).populate('profiles');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const profile = user.profiles.find(profile => profile.name === profileName);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json({
      name: profile.name,
      picture: profile.picture,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('profiles');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const addProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { name } = req.body;
    const profilePicture = req.file;

    if (!name || !profilePicture) {
      return res.status(400).json({ message: 'Name and picture are required' });
    }

    // Convert the image file buffer to a base64 string
    const base64Image = `data:${profilePicture.mimetype};base64,${profilePicture.buffer.toString('base64')}`;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profiles.push({
      name: name,
      picture: base64Image, 
    });

    await user.save();

    res.status(201).json({ message: 'Profile added successfully' });
  } catch (error) {
    console.error('Error adding profile:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profileName } = req.params;
    const { newName, newPicture } = req.body;

    if (!profileName || !newName) {
      return res.status(400).json({ message: 'Profile name and new name are required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profiles.find(profile => profile.name === profileName);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.name = newName;
    profile.picture = newPicture;

    await user.save();

    res.json({ name: profile.name, picture: profile.picture });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profileName } = req.params;

    if (!profileName) {
      return res.status(400).json({ message: 'Profile name is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profileIndex = user.profiles.findIndex(profile => profile.name === profileName);
    if (profileIndex === -1) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    user.profiles.splice(profileIndex, 1);
    await user.save();

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};