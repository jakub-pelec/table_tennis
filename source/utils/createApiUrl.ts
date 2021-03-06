const localApiBase = 'http://10.0.2.2:5001/table-tennis-204a5/us-central1/api/v1/';
const remoteApiBase = 'https://us-central1-table-tennis-204a5.cloudfunctions.net/api/v1';

export const createApiUrl = (apiPath: string) => {
    return `${remoteApiBase}${apiPath}`;
}