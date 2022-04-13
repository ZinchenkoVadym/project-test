const apiRequests = {
    async getUsers(pageNum) {
        const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageNum}&count=6`);
        return await response.json();
    },
    async setUser(formData, token) {
        const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users`, {
            method: 'POST',
            body: formData,
            headers: {
                'Token': token
            },
        })
        return await response.json();
    },
    async getToken() {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        return await response.json();
    },
    async getPositions() {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        return await response.json();

    },
    async getUser(userId) {
        const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users/${userId}`);
        return await response.json();
    },
}

export default apiRequests;