import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css'; 

Chart.register(...registerables);

const BreathingExercise = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [time, setTime] = useState<number>(4);

  useEffect(() => {
    const phases = {
      inhale: 4,
      hold: 4,
      exhale: 6,
    };

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
      if (time === 1) {
        if (phase === 'inhale') {
          setPhase('hold');
          setTime(phases.hold);
        } else if (phase === 'hold') {
          setPhase('exhale');
          setTime(phases.exhale);
        } else {
          setPhase('inhale');
          setTime(phases.inhale);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, phase]);

  return (
    <div className="breathing-exercise">
      <h2>Ejercicio de Respiración</h2>
      <p>
        {phase === 'inhale' ? 'Inhala profundamente' : phase === 'hold' ? 'Sostén la respiración' : 'Exhala lentamente'}
      </p>
      <h1>{time}</h1>
    </div>
  );
};

const Dashboard = () => {
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [clicks, setClicks] = useState<number>(0);
  const [mouseMovements, setMouseMovements] = useState<number>(0);

  const handleMouseMove = () => {
    setMouseMovements(prev => prev + 1);
  };

  const handleClick = () => {
    setClicks(prev => prev + 1);
  };

  const fetchData = async () => {
    setLoading(true);

    const userData = {
      ClicksPerSecond: clicks,
      MouseMovements: mouseMovements,
    };

    try {
      const response = await axios.post('http://localhost:5125/api/wellbeing/process-emotion-data', userData);
      setStressLevel(response.data.stressLevel);
      setDataPoints(prev => [...prev, response.data.stressLevel]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }

    setClicks(0);
    setMouseMovements(0);
  };

  const chartData = {
    labels: dataPoints.map((_, index) => `Registro ${index + 1}`),
    datasets: [{
      label: 'Nivel de Estrés',
      data: dataPoints,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Bienestar Emocional</h1>

      <button className="stress-button" onClick={fetchData}>
        Saber el nivel de estrés
      </button>

      {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <>
          <p className="stress-level">Nivel de estrés detectado: <strong>{stressLevel}</strong></p>

          {stressLevel > 70 && (
            <>
              <p className="stress-warning">Se recomienda tomar un descanso.</p>
              <BreathingExercise />
            </>
          )}

          <div className="chart-container">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;