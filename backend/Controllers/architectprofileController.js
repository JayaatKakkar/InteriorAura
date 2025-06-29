// const ArchitectProfile = require('../Models/architectprofile'); 

// const fs = require('fs');
// const path = require('path');


// exports.createarchitectprofile = async (req, res) => { 
//     // console.log(req.body)
//     try {
//         const { architectlogin_id, qualification , experience,about,email_id,website,company_name,mobile_number,facebook_id,instagram_id} = req.body;
//         const architect_image = req.file ? req.file.path : '';
//         const architectprofile = new ArchitectProfile({architectlogin_id, qualification , experience,about,email_id,website,company_name,mobile_number,facebook_id,instagram_id,architect_image });
//         await architectprofile.save(); 
//         res.status(201).json(architectprofile); 
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getarchitectprofile = async (req, res) => { 
//     try {
//          const { architectlogin_id } = req.query; 
//         const filter = architectlogin_id ? { architectlogin_id } : {};

//         const architectprofiles = await ArchitectProfile.find(filter)
//         .populate('architectlogin_id ', 'name');
//         // const architectprofiles = await ArchitectProfile.find(); 
//         res.json(architectprofiles); 
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// exports.updatearchitectprofile = async (req, res) => { 
//     try {
//         const { architectlogin_id, qualification , experience,about,email_id,website,company_name,mobile_number,facebook_id,instagram_id} = req.body;
//         const updateData = { architectlogin_id, qualification , experience,about,email_id,website,company_name,mobile_number,facebook_id,instagram_id};
//         if (req.file) {
//             updateData.architect_image = req.file.path;
//         }
//         const architectprofile = await ArchitectProfile.findByIdAndUpdate(req.params.id, updateData, { new: true }); 
//         res.json(architectprofile); 
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deletearchitectprofile = async (req, res) => { 
//     try {
//         await ArchitectProfile.findByIdAndDelete(req.params.id); 
//         res.json({ message: 'Deleted Successfully' }); 
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const ArchitectProfile = require('../Models/architectprofile'); 
const fs = require('fs');
const path = require('path');

// Create Architect Profile
exports.createarchitectprofile = async (req, res) => { 
    try {
        const {
              architect_name,architectlogin_id, qualification, experience, about,
            email_id, website, company_name, mobile_number,
            facebook_id, instagram_id
        } = req.body;

        const architect_image = req.file ? req.file.path : '';

        const architectprofile = new ArchitectProfile({
            architect_name, architectlogin_id, qualification, experience, about,
            email_id, website, company_name, mobile_number,
            facebook_id, instagram_id, architect_image
        });

        await architectprofile.save(); 
        res.status(201).json(architectprofile); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get Architect Profiles
exports.getarchitectprofile = async (req, res) => { 
  try {
    const { architectlogin_id } = req.query;
    const filter = architectlogin_id ? { architectlogin_id } : {};

    const architectprofiles = await ArchitectProfile.find(filter);
    res.json(architectprofiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Architect Profile
exports.updatearchitectprofile = async (req, res) => { 
    try {
        const {
             architect_name, architectlogin_id, qualification, experience, about,
            email_id, website, company_name, mobile_number,
            facebook_id, instagram_id
        } = req.body;

        const updateData = {
            architect_name, architectlogin_id, qualification, experience, about,
            email_id, website, company_name, mobile_number,
            facebook_id, instagram_id
        };

        if (req.file) {
            updateData.architect_image = req.file.path;
        }

        const updatedProfile = await ArchitectProfile.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedProfile); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Architect Profile
exports.deletearchitectprofile = async (req, res) => { 
    try {
        const profile = await ArchitectProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Delete image file if it exists
        if (profile.architect_image) {
            const imagePath = path.resolve(profile.architect_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await ArchitectProfile.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Successfully' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
