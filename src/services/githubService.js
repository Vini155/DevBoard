export const fetchGithubToken = async (code) => {
    console.log('Fetching GitHub token with code:', code);
    const resp = await fetch('http://localhost:3001/github/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    })
    const data = await resp.json();
    return data;
}

export const fetchUser = async (token) => {
    console.log('Fetching GitHub user with token:', token);
    const resp = await fetch('http://localhost:3001/github/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await resp.json();
    return data;
}

export const fetchGithubPR = async (request) => {
    console.log('Fetching GitHub PR with request:', request);
    const resp = await fetch('http://localhost:3001/github/pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
    const data = await resp.json();
    return data;
}

export const fetchCommits = async (request) => {
    console.log('Fetching GitHub PR with request:', request);
    const resp = await fetch('http://localhost:3001/github/commits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
    const data = await resp.json();
    return data;
}

export const fetchRepos = async (user, token) => {
    console.log('Fetching GitHub repos with user:', user);
    console.log('Fetching GitHub repos with token:', token);
    // console.log('Fetching GitHub repos with user:', user);
    const resp = await fetch('http://localhost:3001/github/repos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user: user })
    })
    const data = await resp.json();
    return data;
}