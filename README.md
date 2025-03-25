README FILE

---

```md
# 🌐 Crypto Adoption Map & Trading Agent Visualizer

A futuristic, animated world map interface displaying real-time cryptocurrency adoption levels and animated global supply routes, powered by a Python backend and rendered with modern React (Next.js + TypeScript + Framer Motion).

---
!['Project Screenshot'](https://github.com/Dre-AsiliVentures/CryptoAdoptionMap/blob/main/public/Screenshot%202025-03-25%20173148.png)

## 🚀 Features

- 🌍 **World Map Visualization** with live data overlays
- 📊 **Crypto Adoption Heatmap** powered by Chainalysis 2024 report
- 🛰️ **Animated Global Supply Routes** with motion-tracked coordinates
- 🔄 **Live Marker Updates** via FastAPI endpoints
- ⚡ Smooth animation using Framer Motion
- 🔁 Periodic syncing with Python backend every 10 seconds
- ✨ Responsive UI with 90% screen map width

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js (App Router, TypeScript)**
- **React Simple Maps** for rendering the world map
- **Framer Motion** for animated transitions
- **Tailwind CSS** (or your preferred CSS utility)
- **Client-side polling** for live updates

### Backend:
- **FastAPI** (Python 3.10+)
- `adoption.py`: Contains 151-country crypto adoption dataset
- `global_destinations.json`: List of 100 global coordinates for marker routes
- `/adoption` & `/markers` endpoints serve dynamic frontend data

---

## 📁 Project Structure

```
trading-agents-ui/
├── app/
│   └── components/
│       └── app/
│           └── WorldMap.tsx  # Main animated map component
│
backend/
├── main.py                   # FastAPI server with marker + adoption endpoints
├── adoption.py               # Crypto adoption dataset (ranked by index)
├── global_destinations.json # 100 global locations (lat/lng)
```

---

## 📦 Installation

### 🖥️ Frontend

```bash
cd trading-agents-ui
npm install
npm run dev
```

> Runs at `http://localhost:3000`

### ⚙️ Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn
uvicorn main:app --reload
```

> API is hosted at `http://localhost:8000`

---

## 🔗 API Endpoints

| Endpoint         | Description                             |
|------------------|-----------------------------------------|
| `/adoption`      | Returns JSON object with adoption levels|
| `/markers`       | Returns 3 random destinations as markers|

---

## 🎨 Crypto Adoption Coloring Logic

Each country is color-coded based on the Chainalysis 2024 Global Crypto Adoption Index:

- 🟢 **High Adoption** (Ranks 1–20) → `#00ff88`
- 🟠 **Medium Adoption** (Ranks 21–90) → `#ffaa00`
- 🔴 **Low Adoption** (Ranks 91–151) → `#ff4444`
- ⚫ **Not found / unmatched** → `#2b2b2b`

> ✅ Country name normalization is handled to align GeoJSON data with the Chainalysis dataset.

---

## 🛎️ To Do / Ideas

- ⛓️ Integrate live crypto exchange data for each region
- 🌐 Add user interaction per country or route (e.g., hover to see metrics)
- 🤖 Display agents trading on specific exchanges
- 🧠 Add AI predictions or market sentiment overlays
- 💾 Persist historical adoption trends over time

---

## 📚 Data Source

- Chainalysis 2024 Global Crypto Adoption Index Report (pg. 126–134)
- TopoJSON from [World Atlas](https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json)

---

## 📸 Screenshot 
!['Project Screenshot'](https://github.com/Dre-AsiliVentures/CryptoAdoptionMap/blob/main/public/Screenshot%202025-03-25%20173148.png)

---

## 👨‍💻 Author

Made with Andrew ⚡🧠 a.k.a [DreAsiliVentures].

```

---

