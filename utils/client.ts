export async function client(endpoint: string, { body, ...customConfig }: any = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "token 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",
  };

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
