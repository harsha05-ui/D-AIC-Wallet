// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Certificate {
    struct CertificateData {
        string studentName;
        string course;
        string ipfsHash;
        address issuer;
        uint256 timestamp;
        bool isValid;
    }

    // Mapping: address => Certificate[]
    mapping(address => CertificateData[]) public certificates;

    event CertificateIssued(
        address indexed student,
        string studentName,
        string course,
        string ipfsHash,
        address indexed issuer,
        uint256 timestamp
    );

    event CertificateRevoked(
        address indexed student,
        string ipfsHash,
        address indexed issuer
    );

    /**
     * @dev Issues a new digital certificate to a student.
     * @param student The wallet address of the student.
     * @param name The name of the student.
     * @param course The name of the course/degree.
     * @param ipfsHash The IPFS CID hash of the digital certificate.
     */
    function issueCertificate(
        address student,
        string memory name,
        string memory course,
        string memory ipfsHash
    ) public {
        require(student != address(0), "Invalid student address");
        require(bytes(name).length > 0, "Student name cannot be empty");
        require(bytes(course).length > 0, "Course cannot be empty");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        CertificateData memory newCert = CertificateData({
            studentName: name,
            course: course,
            ipfsHash: ipfsHash,
            issuer: msg.sender,
            timestamp: block.timestamp,
            isValid: true
        });

        certificates[student].push(newCert);

        emit CertificateIssued(student, name, course, ipfsHash, msg.sender, block.timestamp);
    }

    /**
     * @dev Returns the list of certificates issued to a specific student wallet.
     * @param student The wallet address of the student.
     */
    function getCertificates(address student) public view returns (CertificateData[] memory) {
        require(student != address(0), "Invalid student address");
        return certificates[student];
    }

    /**
     * @dev Verifies a student's certificates (returns full list for audit).
     * @param student The wallet address of the student.
     */
    function verifyCertificate(address student) public view returns (CertificateData[] memory) {
        require(student != address(0), "Invalid student address");
        return certificates[student];
    }

    /**
     * @dev Allows an issuer to revoke a certificate they issued (Bonus utility function).
     * @param student The wallet address of the student.
     * @param index The index of the certificate in the student's list.
     */
    function revokeCertificate(address student, uint256 index) public {
        require(student != address(0), "Invalid student address");
        require(index < certificates[student].length, "Index out of bounds");
        
        CertificateData storage cert = certificates[student][index];
        require(cert.issuer == msg.sender, "Only the original issuer can revoke this certificate");
        require(cert.isValid, "Certificate is already invalid");

        cert.isValid = false;
        
        emit CertificateRevoked(student, cert.ipfsHash, msg.sender);
    }
}
