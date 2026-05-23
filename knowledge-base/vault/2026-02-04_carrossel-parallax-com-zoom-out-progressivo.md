---
title: "Carrossel parallax com zoom out progressivo"
date: 2026-02-04
account: leonardopimentel.knh@gmail.com
uuid: c10f943f-99e6-4ab9-a87f-64d0f559804e
messages: 2
tags: []
context: ""
---

**Você** _2026-02-04_

Como criar um carrossel paralax que o final o zoom out mostre essa imagem como de forma suave e prorgressova ?

---

**Claude** _2026-02-04_

Vou criar um carrossel parallax com zoom out progressivo que revela essa imagem de forma suave. Vou usar React com animações fluidas.

```jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ParallaxCarousel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: "Step 1: Ideação",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      icon: "💡",
      color: "#1e3a8a"
    },
    {
      title: "Step 2: Lançamento",
      description: "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      icon: "🚀",
      color: "#1e40af"
    },
    {
      title: "Step 3: Crescimento",
      description: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat.",
      icon: "⏱️",
      color: "#2563eb"
    },
    {
      title: "Step 4: Sucesso",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
      icon: "🎯",
      color: "#3b82f6"
    }
  ];

  const totalSteps = steps.length;
  const progress = currentStep / (totalSteps - 1);
  
  // Zoom calculations: starts at 300% and zooms out to 100%
  const zoomLevel = 300 - (progress * 200);
  
  // Parallax effect for layers
  const getParallaxOffset = (layer) => {
    const baseOffset = progress * 100;
    return baseOffset * layer;
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentStep(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const prevStep = () => {
    if (currentStep > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentStep(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isAnimating]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Background with parallax world map */}
      <div 
        className="absolute inset-0 opacity-10 transition-transform duration-1000 ease-out"
        style={{
          transform: `scale(${zoomLevel / 100}) translateX(${-getParallaxOffset(0.3)}px)`,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 600\'%3E%3Cpath fill=\'%23000\' d=\'M300,200 Q350,150 400,200 T500,200 M600,300 L650,250 L700,300 M800,200 Q850,250 900,200\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Main infographic container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative transition-all duration-1000 ease-out"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            opacity: 1
          }}
        >
          {/* 3D Stairs Structure */}
          <div className="relative" style={{ width: '600px', height: '600px' }}>
            {/* Stairs with progressive reveal */}
            {[1, 2, 3, 4].map((step, index) => {
              const isActive = currentStep >= index;
              const delay = index * 0.15;
              
              return (
                <div
                  key={step}
                  className="absolute transition-all duration-800 ease-out"
                  style={{
                    bottom: `${index * 25}%`,
                    left: '50%',
                    transform: `translateX(-50%) translateY(${isActive ? 0 : 50}px) rotateX(${isActive ? 0 : -20}deg)`,
                    opacity: isActive ? 1 : 0.3,
                    transitionDelay: `${delay}s`,
                    zIndex: 4 - index
                  }}
                >
                  {/* Step platform */}
                  <div 
                    className="relative"
                    style={{
                      width: '200px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${index === 3 ? '#3b82f6' : index === 2 ? '#2563eb' : index === 1 ? '#1e40af' : '#1e3a8a'} 0%, ${index === 3 ? '#60a5fa' : index === 2 ? '#3b82f6' : index === 1 ? '#2563eb' : '#1e40af'} 100%)`,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      borderRadius: '4px',
                      transform: 'perspective(600px) rotateX(15deg)'
                    }}
                  >
                    {/* Step number */}
                    <div 
                      className="absolute -right-16 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded font-bold text-lg shadow-lg"
                    >
                      0{step}
                    </div>
                  </div>
                  
                  {/* Vertical connector */}
                  {index < 3 && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-blue-400 to-blue-600"
                      style={{
                        width: '80px',
                        height: '150px',
                        top: '-150px',
                        boxShadow: '-5px 0 15px rgba(0,0,0,0.2)',
                        transform: 'perspective(600px) rotateY(-20deg)'
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Arrow at the top */}
            <div
              className="absolute transition-all duration-1000 ease-out"
              style={{
                top: '-120px',
                left: '50%',
                transform: `translateX(-50%) scale(${currentStep === 3 ? 1 : 0.5}) translateY(${currentStep === 3 ? 0 : 30}px)`,
                opacity: currentStep === 3 ? 1 : 0.5,
                zIndex: 10
              }}
            >
              <div 
                className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-blue-400"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.5))',
                  transform: 'translateY(-20px)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content panels with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {steps.map((step, index) => {
          const isVisible = currentStep === index;
          const side = index % 2 === 0 ? 'left' : 'right';
          const xOffset = side === 'left' ? -50 : 50;
          
          return (
            <div
              key={index}
              className="absolute top-1/2 transition-all duration-800 ease-out"
              style={{
                [side]: '10%',
                transform: `translateY(-50%) translateX(${isVisible ? 0 : xOffset}px)`,
                opacity: isVisible ? 1 : 0,
                maxWidth: '300px'
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{step.icon}</span>
                  <h3 className="text-xl font-bold" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Progress indicators */}
        <div className="flex gap-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentStep(index);
                  setTimeout(() => setIsAnimating(false), 800);
                }
              }}
              className="transition-all duration-300"
              style={{
                width: currentStep === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: currentStep === index 
                  ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' 
                  : '#cbd5e1',
                boxShadow: currentStep === index ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
              }}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Step labels (bottom) */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4'].map((label, index) => (
          <div
            key={label}
            className="text-center transition-all duration-500"
            style={{
              opacity: currentStep === index ? 1 : 0.5,
              transform: `scale(${currentStep === index ? 1.1 : 1})`
            }}
          >
            <div 
              className="px-4 py-1 rounded-full text-white text-xs font-bold mb-2"
              style={{
                background: `linear-gradient(135deg, ${index === 3 ? '#3b82f6' : index === 2 ? '#2563eb' : index === 1 ? '#1e40af' : '#1e3a8a'}, ${index === 3 ? '#60a5fa' : index === 2 ? '#3b82f6' : index === 1 ? '#2563eb' : '#1e40af'})`
              }}
            >
              {label}
            </div>
            <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center text-xl">
              {['💡', '🚀', '⏱️', '🎯'][index]}
            </div>
          </div>
        ))}
      </div>

      {/* Title */}
      <div 
        className="absolute top-10 left-10 transition-all duration-1000"
        style={{
          opacity: 1 - progress * 0.5,
          transform: `translateX(${-getParallaxOffset(0.5)}px)`
        }}
      >
        <h1 className="text-4xl font-bold text-gray-800">
          INFOGRAPHIC
          <br />
          <span className="text-5xl">ELEMENTS</span>
        </h1>
      </div>

      {/* Instructions */}
      <div className="absolute top-10 right-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-600">
        Use as setas ← → ou clique nos controles
      </div>
    </div>
  );
}
```

## Recursos principais:

**Efeito Parallax Multi-camadas:**
- Fundo se move em velocidade diferente do conteúdo principal
- Cada elemento tem sua própria taxa de parallax

**Zoom Out Progressivo:**
- Começa em 300% de zoom no step 1
- Reduz gradualmente até 100% no step 4
- Transição suave de 1 segundo

**Animações 3D:**
- Escadas com perspectiva 3D
- Efeito de profundidade com sombras
- Rotação e transformação dos elementos

**Interatividade:**
- Navegação por setas do teclado
- Botões de navegação
- Indicadores de progresso clicáveis
- Painéis laterais com conteúdo

**Personalização fácil:**
- Altere as cores nos arrays `steps`
- Ajuste a velocidade nas classes `duration-XXX`
- Modifique o zoom inicial mudando o valor 300 em `zoomLevel`

Quer ajustar algum aspecto específico da animação ou adicionar mais efeitos?