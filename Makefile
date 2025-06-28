.PHONY: start

start:
	@echo "🚀 Starting backend and frontend..."
	@echo "Backend: http://0.0.0.0:8000 | Frontend: http://localhost:5174"
	cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 & \
	cd admin && npm run dev

clean:
	@echo "🧹 Clearing cache..."
	@rm -rf backend/__pycache__