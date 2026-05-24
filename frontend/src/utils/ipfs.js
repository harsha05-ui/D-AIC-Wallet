/**
 * Utility to handle IPFS file pinning.
 * Supports authentic Pinata API uploading or a fully simulated local storage fallback for development.
 */

// Generate a random, authentic-looking IPFS CID (v0 format starting with Qm)
function generateMockCID() {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = 'Qm';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Converts a file to a Base64 string for offline storage and previews
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Pin file to IPFS
 * @param {File} file File object from input
 * @param {Object} keys Pinata keys { apiKey, apiSecret }
 * @param {boolean} useMock True if mock local upload is selected
 * @returns {Promise<string>} IPFS CID Hash
 */
export const uploadToIPFS = async (file, keys = {}, useMock = true) => {
  if (useMock) {
    // Simulate small network latency for a high-end feel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Save file locally to mock gateway
    const cid = generateMockCID();
    try {
      const base64Data = await fileToBase64(file);
      // Store in localStorage to act as a local gateway for this session
      localStorage.setItem(`ipfs_mock_${cid}`, JSON.stringify({
        name: file.name,
        type: file.type,
        data: base64Data,
        timestamp: Date.now()
      }));
      console.log(`Mock IPFS Upload Success! Generated CID: ${cid}`);
      return cid;
    } catch (err) {
      console.error("Mock IPFS error:", err);
      throw new Error("Failed to process file locally in mock mode");
    }
  }

  // Authentic Pinata Upload
  if (!keys.apiKey || !keys.apiSecret) {
    throw new Error("Pinata API credentials are required. Configure them or enable 'Mock IPFS' toggle.");
  }

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: `daic_cert_${Date.now()}`,
    keyvalues: {
      project: 'D-AIC-Wallet'
    }
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0
  });
  formData.append('pinataOptions', options);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'pinata_api_key': keys.apiKey,
      'pinata_secret_api_key': keys.apiSecret
    },
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData?.error?.details || `IPFS upload failed with status ${response.status}`);
  }

  const result = await response.json();
  return result.IpfsHash; // Returns the CID
};

/**
 * Retrieves the gateway URL or local data for a given IPFS CID
 */
export const getIPFSUrl = (cid) => {
  if (!cid) return '#';
  // Check if it is a mock CID in our localStorage
  const mockData = localStorage.getItem(`ipfs_mock_${cid}`);
  if (mockData) {
    try {
      const parsed = JSON.parse(mockData);
      return parsed.data; // Return the base64 source directly so it can be previewed/rendered
    } catch (e) {
      console.error("Failed to parse mock IPFS item:", e);
    }
  }
  // Standard Pinata Public Gateway
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
};
