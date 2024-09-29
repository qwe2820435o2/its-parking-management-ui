class UsersService {

    private apiUrl = '/api/users';

    async queryUsers(pageIndex: number, pageSize: number) {
        const response = await fetch(`${this.apiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return response.json();
    }

    async addUser(user: { name: string, email: string, password: string }) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }

        return response.json();
    }


}