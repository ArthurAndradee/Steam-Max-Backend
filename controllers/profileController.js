import User from '../models/userModel.js';

export const getProfile = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming req.user is set by auth middleware
      const profileName = req.query.profileName; // Get profileName from query

      if (!profileName) {
        return res.status(400).json({ message: 'Profile name is required' });
      }

      // Find the user and populate profiles
      const user = await User.findById(userId).populate('profiles');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Find the profile with the given name
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
