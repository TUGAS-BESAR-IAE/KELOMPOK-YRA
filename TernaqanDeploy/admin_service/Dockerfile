FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port (ubah sesuai kebutuhan, misal 8000)
EXPOSE 8000

# Jalankan server (ubah jika entrypoint berbeda)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]