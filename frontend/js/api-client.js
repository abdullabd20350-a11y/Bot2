class BotAPI {
    constructor() {
        this.baseURL = '/api';
    }

    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || '??? ??? ?? ???????');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async getAllBots() {
        return this.request('/bots');
    }

    async addBot(botData) {
        return this.request('/bots', {
            method: 'POST',
            body: JSON.stringify(botData)
        });
    }

    async startBot(botId) {
        return this.request(`/bots/${botId}/start`, {
            method: 'POST'
        });
    }

    async stopBot(botId) {
        return this.request(`/bots/${botId}/stop`, {
            method: 'POST'
        });
    }

    async deleteBot(botId) {
        return this.request(`/bots/${botId}`, {
            method: 'DELETE'
        });
    }
}
