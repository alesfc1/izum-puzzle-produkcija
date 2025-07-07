export default async function handler(req, res) {
    const { q } = req.query;

    try {
        const response = await fetch(`http://localhost:8080/cobiss/api/si/sl/search/cobib?q=${encodeURIComponent(q)}&max=100`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Napaka pri proxyju:", error);
        res.status(500).json({ error: "Proxy napaka" });
    }
}
