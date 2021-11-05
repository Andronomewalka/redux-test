const headers: any = {
  "Content-Type": "application/json",
}

export async function client(endpoint: string, { body, ...customConfig }: any = {}) {
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "POST", body });
};

client.put = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "PUT", body });
};

client.delete = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE", body });
};

client.setAuthorizationToken = function(token: string) {
  headers['Authorization'] = token;
}
