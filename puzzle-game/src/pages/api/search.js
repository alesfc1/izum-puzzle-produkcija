export default async function handler(req, res) {
    const { q } = req.query;

    try {
        const response = await fetch(`http://localhost:8080/cobiss/api/si/sl/search/cobib?q=${encodeURIComponent(q)}&prf=cobiss ela&max=500`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if(data.value.hitsNo === 0) {
            res.status(404).json({ error: "Ni zadetkov" });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.error("Napaka pri proxyju:", error);
        res.status(500).json({ error: "Proxy napaka" });
    }
}
