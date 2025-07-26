import React, { useState } from 'react';
import { User, MapPin, Phone, Store, Camera, CheckCircle } from 'lucide-react';
import { useFirestoreCollection } from '../hooks/useFirestore';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { data: vendors, addDocument: addVendor, updateDocument: updateVendor } = useFirestoreCollection('vendors');
  
  const [profileData, setProfileData] = useState({
    name: 'Demo Vendor',
    shopName: 'Fresh Produce Store',
    phone: '+91 9876543210',
    location: 'Mumbai Central Market',
    isVerified: false,
    profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [verificationData, setVerificationData] = useState({
    businessLicense: '',
    shopPhoto: '',
    locationProof: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you'd update the current user's document
      await addVendor(profileData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate verification process
      setProfileData(prev => ({ ...prev, isVerified: true }));
      toast.success('Verification submitted! You will be verified within 24 hours.');
    } catch (error) {
      toast.error('Failed to submit verification');
    }
  };

  const handlePhotoUpload = (field: string) => {
    // Simulate photo upload
    const mockPhotoUrl = 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=400';
    
    if (field === 'profilePhoto') {
      setProfileData(prev => ({ ...prev, profilePhoto: mockPhotoUrl }));
    } else {
      setVerificationData(prev => ({ ...prev, [field]: mockPhotoUrl }));
    }
    
    toast.success('Photo uploaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile and verification status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Photo */}
                  <div className="md:col-span-2 flex flex-col items-center space-y-4">
                    <div className="relative">
                      <img
                        src={profileData.profilePhoto}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500"
                      />
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handlePhotoUpload('profilePhoto')}
                          className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      required
                    />
                  </div>

                  {/* Shop Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Store className="inline h-4 w-4 mr-1" />
                      Shop Name
                    </label>
                    <input
                      type="text"
                      value={profileData.shopName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, shopName: e.target.value }))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      pattern="[+][0-9]{2}[0-9]{10}"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      required
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Verification Status & Form */}
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
              
              {profileData.isVerified ? (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-medium text-green-700">Verified Vendor</p>
                    <p className="text-sm text-green-600">Access to all features</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-yellow-700">Pending Verification</p>
                      <p className="text-sm text-yellow-600">Complete verification to unlock all features</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">Required Documents:</p>
                    <ul className="space-y-1">
                      <li>• Business License/Registration</li>
                      <li>• Shop Photo</li>
                      <li>• Location Proof</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Form */}
            {!profileData.isVerified && (
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">VPT Verification</h3>
                
                <form onSubmit={handleVerificationSubmit} className="space-y-4">
                  {/* Business License */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business License
                    </label>
                    <div className="flex items-center space-x-3">
                      {verificationData.businessLicense ? (
                        <img 
                          src={verificationData.businessLicense} 
                          alt="License" 
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePhotoUpload('businessLicense')}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  {/* Shop Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shop Photo
                    </label>
                    <div className="flex items-center space-x-3">
                      {verificationData.shopPhoto ? (
                        <img 
                          src={verificationData.shopPhoto} 
                          alt="Shop" 
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePhotoUpload('shopPhoto')}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  {/* Location Proof */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Proof
                    </label>
                    <div className="flex items-center space-x-3">
                      {verificationData.locationProof ? (
                        <img 
                          src={verificationData.locationProof} 
                          alt="Location" 
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePhotoUpload('locationProof')}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!verificationData.businessLicense || !verificationData.shopPhoto || !verificationData.locationProof}
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit for Verification
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;