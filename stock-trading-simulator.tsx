import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Home, Search, User, PieChart, Settings, Bell, Plus, Minus, X, BarChart3, Wallet, DollarSign, Hash } from 'lucide-react';

const NeumorphicTradingApp = () => {
  // État principal de l'application
  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    holdings: {},
    totalValue: 10000,
    totalGainLoss: 0
  });
  
  const [transactions, setTransactions] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(100); // Montant en euros
  const [buyMode, setBuyMode] = useState('quantity'); // 'quantity' ou 'amount'
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('buy');

  // Données de marché étendues avec tous les instruments financiers
  const [marketData, setMarketData] = useState({
    // Actions Américaines
    'AAPL': { name: 'Apple Inc.', price: 193.50, change: 2.30, changePercent: 1.20, volume: '45.2M', type: 'stock', category: 'Actions' },
    'GOOGL': { name: 'Alphabet Inc.', price: 138.21, change: -1.45, changePercent: -1.04, volume: '28.1M', type: 'stock', category: 'Actions' },
    'MSFT': { name: 'Microsoft Corp.', price: 416.42, change: 5.67, changePercent: 1.38, volume: '22.8M', type: 'stock', category: 'Actions' },
    'TSLA': { name: 'Tesla Inc.', price: 248.50, change: -8.20, changePercent: -3.20, volume: '67.3M', type: 'stock', category: 'Actions' },
    'AMZN': { name: 'Amazon.com Inc.', price: 145.86, change: 0.92, changePercent: 0.63, volume: '31.5M', type: 'stock', category: 'Actions' },
    'NVDA': { name: 'NVIDIA Corp.', price: 118.11, change: 3.45, changePercent: 3.01, volume: '78.9M', type: 'stock', category: 'Actions' },
    'META': { name: 'Meta Platforms', price: 298.55, change: -2.10, changePercent: -0.70, volume: '19.7M', type: 'stock', category: 'Actions' },
    'NFLX': { name: 'Netflix Inc.', price: 402.31, change: 7.85, changePercent: 1.99, volume: '12.4M', type: 'stock', category: 'Actions' },
    
    // Actions Européennes
    'ASML': { name: 'ASML Holding', price: 689.20, change: 12.50, changePercent: 1.85, volume: '1.2M', type: 'stock', category: 'Actions' },
    'SAP': { name: 'SAP SE', price: 234.80, change: -3.20, changePercent: -1.34, volume: '890K', type: 'stock', category: 'Actions' },
    'LVMH': { name: 'LVMH', price: 842.60, change: 18.40, changePercent: 2.23, volume: '456K', type: 'stock', category: 'Actions' },
    
    // Cryptomonnaies
    'BTC-EUR': { name: 'Bitcoin', price: 65420.30, change: 1250.80, changePercent: 1.95, volume: '2.1B', type: 'crypto', category: 'Crypto' },
    'ETH-EUR': { name: 'Ethereum', price: 3420.15, change: -45.20, changePercent: -1.30, volume: '890M', type: 'crypto', category: 'Crypto' },
    'ADA-EUR': { name: 'Cardano', price: 0.52, change: 0.03, changePercent: 6.12, volume: '124M', type: 'crypto', category: 'Crypto' },
    'SOL-EUR': { name: 'Solana', price: 158.45, change: 8.90, changePercent: 5.95, volume: '245M', type: 'crypto', category: 'Crypto' },
    'DOT-EUR': { name: 'Polkadot', price: 7.85, change: -0.12, changePercent: -1.51, volume: '67M', type: 'crypto', category: 'Crypto' },
    
    // ETFs
    'VOO': { name: 'Vanguard S&P 500', price: 456.78, change: 3.45, changePercent: 0.76, volume: '3.2M', type: 'etf', category: 'ETF' },
    'QQQ': { name: 'Invesco QQQ Trust', price: 389.20, change: 2.80, changePercent: 0.72, volume: '28.5M', type: 'etf', category: 'ETF' },
    'VTI': { name: 'Vanguard Total Market', price: 267.45, change: 1.95, changePercent: 0.73, volume: '2.8M', type: 'etf', category: 'ETF' },
    'VXUS': { name: 'Vanguard Intl Stock', price: 64.32, change: -0.45, changePercent: -0.69, volume: '1.1M', type: 'etf', category: 'ETF' },
    
    // Matières Premières
    'GOLD': { name: 'Or (once)', price: 2034.50, change: 15.20, changePercent: 0.75, volume: '145K', type: 'commodity', category: 'Matières' },
    'SILVER': { name: 'Argent (once)', price: 24.85, change: -0.32, changePercent: -1.27, volume: '89K', type: 'commodity', category: 'Matières' },
    'OIL': { name: 'Pétrole WTI', price: 78.45, change: 1.25, changePercent: 1.62, volume: '234K', type: 'commodity', category: 'Matières' },
    'COPPER': { name: 'Cuivre', price: 8.92, change: 0.08, changePercent: 0.91, volume: '67K', type: 'commodity', category: 'Matières' },
    
    // Indices
    'SPX': { name: 'S&P 500 Index', price: 4789.35, change: 23.45, changePercent: 0.49, volume: '-', type: 'index', category: 'Indices' },
    'NASDAQ': { name: 'NASDAQ Composite', price: 15234.89, change: 89.23, changePercent: 0.59, volume: '-', type: 'index', category: 'Indices' },
    'DAX': { name: 'DAX 40', price: 17456.32, change: -45.67, changePercent: -0.26, volume: '-', type: 'index', category: 'Indices' },
    'CAC40': { name: 'CAC 40', price: 7689.45, change: 12.34, changePercent: 0.16, volume: '-', type: 'index', category: 'Indices' },
    
    // Devises
    'EUR/USD': { name: 'Euro Dollar', price: 1.0845, change: 0.0023, changePercent: 0.21, volume: '5.2B', type: 'forex', category: 'Devises' },
    'GBP/USD': { name: 'Livre Sterling Dollar', price: 1.2634, change: -0.0045, changePercent: -0.35, volume: '2.1B', type: 'forex', category: 'Devises' },
    'USD/JPY': { name: 'Dollar Yen', price: 149.45, change: 0.67, changePercent: 0.45, volume: '3.8B', type: 'forex', category: 'Devises' },
    'USD/CHF': { name: 'Dollar Franc Suisse', price: 0.8923, change: -0.0012, changePercent: -0.13, volume: '1.5B', type: 'forex', category: 'Devises' }
  });

  const categories = ['Tout', 'Actions', 'Crypto', 'ETF', 'Matières', 'Indices', 'Devises'];

  // Système de frais réalistes
  const calculateFees = React.useCallback((symbol, transactionAmount, type) => {
    if (!marketData[symbol]) return { brokerage: 0, spread: 0, currency: 0, management: 0, total: 0 };
    
    const stock = marketData[symbol];
    let fees = {
      brokerage: 0,
      spread: 0,
      currency: 0,
      management: 0,
      total: 0
    };

    switch(stock.type) {
      case 'stock':
        // Frais de courtage : 0.50€ minimum + 0.25% plafonné à 15€
        fees.brokerage = Math.min(Math.max(0.50, transactionAmount * 0.0025), 15);
        // Spread bid/ask : 0.05-0.15%
        fees.spread = transactionAmount * 0.001;
        // Frais de change si action étrangère
        if (!symbol.includes('EUR')) {
          fees.currency = transactionAmount * 0.002; // 0.2%
        }
        break;
        
      case 'crypto':
        // Frais crypto : 0.5-1.5% selon la volatilité
        fees.brokerage = transactionAmount * 0.01;
        // Spread plus élevé pour crypto
        fees.spread = transactionAmount * 0.002;
        break;
        
      case 'etf':
        // Frais ETF : 0.10€ minimum + 0.15%
        fees.brokerage = Math.max(0.10, transactionAmount * 0.0015);
        // TER annuel simulé sur transaction (divisé par 365 pour un jour)
        const ter = stock.name.includes('Vanguard') ? 0.0003 : 0.0005; // 0.03% vs 0.05% annuel
        fees.management = transactionAmount * ter / 365;
        fees.spread = transactionAmount * 0.0003;
        break;
        
      case 'forex':
        // Pas de frais de courtage, seulement spread
        fees.spread = transactionAmount * 0.0003; // 3 pips moyens
        // Frais overnight si position gardée (simulé)
        if (type === 'buy') fees.management = transactionAmount * 0.0001;
        break;
        
      case 'commodity':
        // Frais matières premières : 1-2%
        fees.brokerage = transactionAmount * 0.015;
        fees.spread = transactionAmount * 0.002;
        break;
        
      case 'index':
        // Frais indices/CFD : spread + financement
        fees.spread = transactionAmount * 0.0008;
        fees.management = transactionAmount * 0.0002; // Frais de financement
        break;
        
      default:
        fees.brokerage = transactionAmount * 0.005;
        fees.spread = transactionAmount * 0.001;
    }

    fees.total = fees.brokerage + fees.spread + fees.currency + fees.management;
    
    // Arrondir tous les frais à 2 décimales
    Object.keys(fees).forEach(key => {
      fees[key] = Math.round(fees[key] * 100) / 100;
    });

    return fees;
  }, [marketData]);

  // Simulation des fluctuations de prix
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => {
        const newData = { ...prevData };
        Object.keys(newData).forEach(symbol => {
          let volatility = 0.01; // 1% par défaut
          
          // Ajuster la volatilité selon le type d'instrument
          switch(newData[symbol].type) {
            case 'crypto':
              volatility = 0.03; // 3% pour crypto (plus volatile)
              break;
            case 'commodity':
              volatility = 0.02; // 2% pour matières premières
              break;
            case 'forex':
              volatility = 0.005; // 0.5% pour devises (moins volatile)
              break;
            case 'index':
              volatility = 0.008; // 0.8% pour indices
              break;
            default:
              volatility = 0.015; // 1.5% pour actions et ETFs
          }
          
          const changePercent = (Math.random() - 0.5) * volatility;
          const newPrice = newData[symbol].price * (1 + changePercent);
          const priceChange = newPrice - newData[symbol].price;
          
          newData[symbol] = {
            ...newData[symbol],
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(priceChange * 100) / 100,
            changePercent: Math.round(changePercent * 10000) / 100
          };
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculer la valeur totale du portefeuille
  useEffect(() => {
    const holdingsValue = Object.entries(portfolio.holdings).reduce((total, [symbol, shares]) => {
      return total + (shares * (marketData[symbol]?.price || 0));
    }, 0);
    
    const totalValue = portfolio.cash + holdingsValue;
    const totalGainLoss = totalValue - 10000;
    
    setPortfolio(prev => ({
      ...prev,
      totalValue: Math.round(totalValue * 100) / 100,
      totalGainLoss: Math.round(totalGainLoss * 100) / 100
    }));
  }, [portfolio.holdings, portfolio.cash, marketData]);

  // Calculer le nombre d'actions basé sur le montant (en tenant compte des frais)
  const calculateQuantityFromAmount = React.useCallback(() => {
    if (buyMode === 'amount' && selectedStock && marketData[selectedStock]) {
      const fees = calculateFees(selectedStock, amount, 'buy');
      const availableAmount = amount - fees.total;
      return Math.max(0, Math.floor(availableAmount / marketData[selectedStock].price));
    }
    return quantity;
  }, [buyMode, selectedStock, amount, quantity, marketData, calculateFees]);

  // Calculer le montant basé sur la quantité
  const calculateAmountFromQuantity = React.useCallback(() => {
    if (buyMode === 'quantity' && selectedStock && marketData[selectedStock]) {
      return quantity * marketData[selectedStock].price;
    }
    return amount;
  }, [buyMode, selectedStock, quantity, amount, marketData]);

  // Fonctions de trading avec frais
  const buyStock = () => {
    if (!selectedStock || !marketData[selectedStock]) return;
    
    const stock = marketData[selectedStock];
    const finalQuantity = buyMode === 'amount' ? calculateQuantityFromAmount() : quantity;
    const baseAmount = finalQuantity * stock.price;
    const fees = calculateFees(selectedStock, baseAmount, 'buy');
    const totalCost = baseAmount + fees.total;
    
    if (totalCost > portfolio.cash || finalQuantity === 0) {
      alert(finalQuantity === 0 ? 'Montant insuffisant pour acheter au moins 1 action après frais !' : 'Fonds insuffisants pour couvrir l\'achat et les frais !');
      return;
    }
    
    setPortfolio(prev => ({
      ...prev,
      cash: prev.cash - totalCost,
      holdings: {
        ...prev.holdings,
        [selectedStock]: (prev.holdings[selectedStock] || 0) + finalQuantity
      }
    }));
    
    setTransactions(prev => [{
      id: Date.now(),
      type: 'BUY',
      symbol: selectedStock,
      quantity: finalQuantity,
      price: stock.price,
      baseAmount: baseAmount,
      fees: fees,
      total: totalCost,
      date: new Date().toLocaleString('fr-FR')
    }, ...prev]);
    
    setQuantity(1);
    setAmount(100);
    setShowTradeModal(false);
    setSelectedStock(null);
  };

  const sellStock = () => {
    if (!selectedStock || !marketData[selectedStock]) return;
    
    const currentShares = portfolio.holdings[selectedStock] || 0;
    const finalQuantity = buyMode === 'amount' ? Math.min(calculateQuantityFromAmount(), currentShares) : quantity;
    
    if (finalQuantity > currentShares || finalQuantity === 0) {
      alert('Vous ne possédez pas assez d\'actions !');
      return;
    }
    
    const stock = marketData[selectedStock];
    const baseAmount = finalQuantity * stock.price;
    const fees = calculateFees(selectedStock, baseAmount, 'sell');
    const netRevenue = baseAmount - fees.total;
    
    setPortfolio(prev => ({
      ...prev,
      cash: prev.cash + netRevenue,
      holdings: {
        ...prev.holdings,
        [selectedStock]: Math.max(0, currentShares - finalQuantity)
      }
    }));
    
    setTransactions(prev => [{
      id: Date.now(),
      type: 'SELL',
      symbol: selectedStock,
      quantity: finalQuantity,
      price: stock.price,
      baseAmount: baseAmount,
      fees: fees,
      total: netRevenue,
      date: new Date().toLocaleString('fr-FR')
    }, ...prev]);
    
    setQuantity(1);
    setAmount(100);
    setShowTradeModal(false);
    setSelectedStock(null);
  };

  const openTradeModal = (symbol, type) => {
    setSelectedStock(symbol);
    setTradeType(type);
    setShowTradeModal(true);
    setQuantity(1);
    setAmount(100);
    setBuyMode('quantity');
  };

  const filteredStocks = Object.entries(marketData).filter(([symbol, data]) => {
    const matchesSearch = symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         data.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tout' || data.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (symbol, price) => {
    const data = marketData[symbol];
    if (data.type === 'crypto' && symbol.includes('EUR')) {
      return `${price.toLocaleString('fr-FR')}€`;
    } else if (data.type === 'forex') {
      return price.toFixed(4);
    } else {
      return `$${price.toFixed(2)}`;
    }
  };

  const getTypeIcon = (type, symbolParam) => {
    switch(type) {
      case 'crypto': return '₿';
      case 'etf': return 'ETF';
      case 'commodity': return '🏅';
      case 'index': return '📊';
      case 'forex': return '💱';
      default: return symbolParam.charAt(0);
    }
  };

  // Styles neumorphiques
  const neumorphicCard = {
    background: '#e0e5ec',
    borderRadius: '20px',
    boxShadow: '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
  };

  const neumorphicInset = {
    background: '#e0e5ec',
    borderRadius: '15px',
    boxShadow: 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff',
  };

  const neumorphicButton = {
    background: '#e0e5ec',
    borderRadius: '12px',
    boxShadow: '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff',
    transition: 'all 0.2s ease',
  };

  const neumorphicButtonPressed = {
    background: '#e0e5ec',
    borderRadius: '12px',
    boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff',
  };

  return (
    <div className="min-h-screen text-gray-700 font-light max-w-md mx-auto relative" style={{ background: '#e0e5ec' }}>
      
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-light text-gray-800">Portfolio</div>
          <div className="flex space-x-3">
            <button 
              style={neumorphicButton} 
              className="w-10 h-10 flex items-center justify-center text-gray-600"
              onMouseDown={(e) => e.target.style = {...neumorphicButtonPressed}}
              onMouseUp={(e) => e.target.style = {...neumorphicButton}}
              onMouseLeave={(e) => e.target.style = {...neumorphicButton}}
            >
              <Bell size={18} />
            </button>
            <button 
              style={neumorphicButton} 
              className="w-10 h-10 flex items-center justify-center text-gray-600"
              onMouseDown={(e) => e.target.style = {...neumorphicButtonPressed}}
              onMouseUp={(e) => e.target.style = {...neumorphicButton}}
              onMouseLeave={(e) => e.target.style = {...neumorphicButton}}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
        
        {/* Avertissement frais */}
        <div style={neumorphicInset} className="p-3 mb-2">
          <div className="text-xs text-gray-600 text-center">
            ⚠️ <strong>Frais réalistes inclus</strong> : Courtage, spreads, change selon l'instrument
          </div>
        </div>
      </div>

      {/* Home Tab */}
      {activeTab === 'home' && (
        <div className="px-8 pb-24">
          {/* Portfolio Value Hero */}
          <div style={{
            ...neumorphicCard,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '32px',
            padding: '2rem',
            marginBottom: '2rem'
          }} className="text-white text-center">
            <div className="text-sm opacity-80 mb-2">Valeur totale</div>
            <div className="text-3xl font-light mb-4">
              {portfolio.totalValue.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0 
              })}
            </div>
            <div className={`flex items-center justify-center text-lg font-medium ${
              portfolio.totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'
            }`}>
              {portfolio.totalGainLoss >= 0 ? (
                <TrendingUp size={20} className="mr-2" />
              ) : (
                <TrendingDown size={20} className="mr-2" />
              )}
              {portfolio.totalGainLoss >= 0 ? '+' : ''}
              {portfolio.totalGainLoss.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              ({((portfolio.totalGainLoss / 10000) * 100).toFixed(2)}%)
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div style={{...neumorphicCard, borderRadius: '24px'}} className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <Wallet size={24} className="text-white" />
              </div>
              <div className="text-gray-500 text-sm mb-2">Liquidités</div>
              <div className="text-xl font-light text-gray-800">
                {portfolio.cash.toLocaleString('fr-FR', { 
                  style: 'currency', 
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
                })}
              </div>
            </div>
            <div style={{...neumorphicCard, borderRadius: '24px'}} className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div className="text-gray-500 text-sm mb-2">Positions</div>
              <div className="text-xl font-light text-gray-800">
                {Object.values(portfolio.holdings).filter(shares => shares > 0).length}
              </div>
            </div>
          </div>

          {/* Mes Positions */}
          <div className="mb-8">
            <h2 className="text-xl font-light text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-600 flex items-center justify-center">
                <Wallet size={16} className="text-white" />
              </div>
              Mes positions
            </h2>
            {Object.entries(portfolio.holdings).filter(([_, shares]) => shares > 0).length === 0 ? (
              <div style={{...neumorphicInset, borderRadius: '24px'}} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div className="text-gray-500 font-medium">Aucune position active</div>
                <div className="text-xs text-gray-400 mt-2">
                  Vos investissements apparaîtront ici
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(portfolio.holdings)
                  .filter(([_, shares]) => shares > 0)
                  .map(([symbol, shares]) => {
                    const stock = marketData[symbol];
                    const value = shares * stock.price;
                    return (
                      <div
                        key={symbol}
                        onClick={() => openTradeModal(symbol, 'sell')}
                        style={{...neumorphicButton, borderRadius: '20px'}}
                        className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 text-white font-medium shadow-lg"
                              style={{
                                background: stock.type === 'crypto' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                                          stock.type === 'etf' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                                          stock.type === 'commodity' ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' :
                                          stock.type === 'forex' ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' :
                                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                              }}
                            >
                              {getTypeIcon(stock.type, symbol)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 text-lg">{symbol}</div>
                              <div className="text-sm text-gray-500">
                                {shares} {stock.type === 'forex' ? 'unités' : 'actions'}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-medium text-gray-800">
                              {value.toLocaleString('fr-FR', { 
                                style: 'currency', 
                                currency: 'EUR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0 
                              })}
                            </div>
                            <div className={`text-sm font-medium flex items-center justify-end ${
                              stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {stock.changePercent >= 0 ? (
                                <TrendingUp size={14} className="mr-1" />
                              ) : (
                                <TrendingDown size={14} className="mr-1" />
                              )}
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Tendances du marché */}
          <div>
            <h2 className="text-xl font-light text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
              Tendances du marché
            </h2>
            <div className="space-y-4">
              {Object.entries(marketData).slice(0, 6).map(([symbol, stock]) => (
                <div
                  key={symbol}
                  onClick={() => openTradeModal(symbol, 'buy')}
                  style={{...neumorphicButton, borderRadius: '20px'}}
                  className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 text-white font-medium shadow-lg"
                        style={{
                          background: stock.type === 'crypto' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                                    stock.type === 'etf' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                                    stock.type === 'commodity' ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' :
                                    stock.type === 'forex' ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' :
                                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                      >
                        {getTypeIcon(stock.type, symbol)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-lg">{symbol}</div>
                        <div className="text-sm text-gray-500">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-800">
                        {formatPrice(symbol, stock.price)}
                      </div>
                      <div className={`text-sm font-medium flex items-center justify-end ${
                        stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stock.changePercent >= 0 ? (
                          <TrendingUp size={14} className="mr-1" />
                        ) : (
                          <TrendingDown size={14} className="mr-1" />
                        )}
                        {Math.abs(stock.changePercent).toFixed(2)}%
                      </div>
                      {/* Indicateur de frais */}
                      <div className="text-xs text-gray-400 mt-1">
                        {(() => {
                          const estimatedAmount = 1000;
                          const fees = calculateFees(symbol, estimatedAmount, 'buy');
                          const feePercent = (fees.total / estimatedAmount) * 100;
                          return `Frais: ~${feePercent.toFixed(2)}%`;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="px-6 pb-24">
          {/* Search Bar */}
          <div className="mb-6">
            <div style={neumorphicInset} className="p-4 flex items-center">
              <Search size={20} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Rechercher des instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Catégories */}
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={activeCategory === category ? neumorphicInset : neumorphicButton}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                    activeCategory === category ? 'text-gray-700' : 'text-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Liste des instruments */}
          <div className="space-y-4">
            {filteredStocks.map(([symbol, stock]) => (
              <div
                key={symbol}
                onClick={() => openTradeModal(symbol, 'buy')}
                style={neumorphicButton}
                className="p-4 cursor-pointer active:shadow-inner"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white font-medium text-xs"
                      style={{
                        background: stock.type === 'crypto' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                                  stock.type === 'etf' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                                  stock.type === 'commodity' ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' :
                                  stock.type === 'forex' ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' :
                                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff'
                      }}
                    >
                      {getTypeIcon(stock.type, symbol)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">
                      {formatPrice(symbol, stock.price)}
                    </div>
                    <div className={`text-sm font-medium flex items-center justify-end ${
                      stock.changePercent >= 0 ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {stock.changePercent >= 0 ? (
                        <TrendingUp size={12} className="mr-1" />
                      ) : (
                        <TrendingDown size={12} className="mr-1" />
                      )}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </div>
                    {/* Indicateur de frais */}
                    <div className="text-xs text-gray-400 mt-1">
                      {(() => {
                        const estimatedAmount = 1000;
                        const fees = calculateFees(symbol, estimatedAmount, 'buy');
                        const feePercent = (fees.total / estimatedAmount) * 100;
                        return `Frais: ~${feePercent.toFixed(2)}%`;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <div className="px-6 pb-24">
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">Statistiques</h1>
            
            {/* Performance Summary */}
            <div style={neumorphicCard} className="p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-light text-gray-800 mb-2">
                  {portfolio.totalValue.toLocaleString('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0 
                  })}
                </div>
                <div className={`text-lg font-medium ${
                  portfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-500'
                }`}>
                  {portfolio.totalGainLoss >= 0 ? '+' : ''}
                  {portfolio.totalGainLoss.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  ({((portfolio.totalGainLoss / 10000) * 100).toFixed(2)}%)
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div style={neumorphicInset} className="p-4 rounded-2xl">
                    <div className="text-sm text-gray-500 mb-1">Investi</div>
                    <div className="font-medium text-gray-800">
                      {(portfolio.totalValue - portfolio.cash).toLocaleString('fr-FR', { 
                        style: 'currency', 
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0 
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div style={neumorphicInset} className="p-4 rounded-2xl">
                    <div className="text-sm text-gray-500 mb-1">Liquidités</div>
                    <div className="font-medium text-gray-800">
                      {portfolio.cash.toLocaleString('fr-FR', { 
                        style: 'currency', 
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings */}
            <h2 className="text-lg font-medium text-gray-800 mb-4">Positions détaillées</h2>
            {Object.entries(portfolio.holdings).filter(([_, shares]) => shares > 0).length === 0 ? (
              <div style={neumorphicInset} className="p-8 text-center">
                <PieChart size={48} className="mx-auto mb-4 text-gray-400" />
                <div className="text-gray-500 mb-2">Aucune position</div>
                <div className="text-xs text-gray-400">Investissez pour voir vos positions ici</div>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(portfolio.holdings)
                  .filter(([_, shares]) => shares > 0)
                  .map(([symbol, shares]) => {
                    const stock = marketData[symbol];
                    const value = shares * stock.price;
                    return (
                      <div
                        key={symbol}
                        onClick={() => openTradeModal(symbol, 'sell')}
                        style={neumorphicButton}
                        className="p-4 cursor-pointer active:shadow-inner"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="font-medium text-gray-800">{symbol}</div>
                          <div className="font-medium text-gray-800">
                            {value.toLocaleString('fr-FR', { 
                              style: 'currency', 
                              currency: 'EUR',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0 
                            })}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-500">
                            {shares} {stock.type === 'forex' ? 'unités' : 'actions'} × {formatPrice(symbol, stock.price)}
                          </div>
                          <div className={`font-medium ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          {transactions.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Transactions récentes</h2>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} style={neumorphicCard} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm ${
                            transaction.type === 'BUY' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{
                            boxShadow: '2px 2px 4px #a3b1c6, -2px -2px 4px #ffffff'
                          }}
                        >
                          {transaction.type === 'BUY' ? <Plus size={14} /> : <Minus size={14} />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{transaction.symbol}</div>
                          <div className="text-xs text-gray-500">
                            {transaction.quantity} {marketData[transaction.symbol]?.type === 'forex' ? 'unités' : 'actions'} × {transaction.price?.toFixed(2)}€
                          </div>
                          {/* Affichage des frais si disponibles */}
                          {transaction.fees && transaction.fees.total > 0 && (
                            <div className="text-xs text-red-500 mt-1">
                              Frais: {transaction.fees.total.toFixed(2)}€
                              {transaction.fees.brokerage > 0 && ` (Courtage: ${transaction.fees.brokerage.toFixed(2)}€`}
                              {transaction.fees.spread > 0 && `, Spread: ${transaction.fees.spread.toFixed(2)}€`}
                              {transaction.fees.currency > 0 && `, Change: ${transaction.fees.currency.toFixed(2)}€`}
                              {transaction.fees.management > 0 && `, Gestion: ${transaction.fees.management.toFixed(2)}€`}
                              {(transaction.fees.brokerage > 0 || transaction.fees.spread > 0 || transaction.fees.currency > 0 || transaction.fees.management > 0) && ')'}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 mt-1">{transaction.date.split(' ')[0]}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${
                          transaction.type === 'BUY' ? 'text-red-500' : 'text-green-600'
                        }`}>
                          {transaction.type === 'BUY' ? '-' : '+'}
                          {transaction.total.toLocaleString('fr-FR', { 
                            style: 'currency', 
                            currency: 'EUR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0 
                          })}
                        </div>
                        {/* Montant brut vs net */}
                        {transaction.fees && transaction.fees.total > 0 && (
                          <div className="text-xs text-gray-500">
                            {transaction.type === 'BUY' ? 'TTC' : 'Net'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trading Modal */}
      {showTradeModal && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-6">
          <div style={{...neumorphicCard, maxHeight: '90vh', overflowY: 'auto'}} className="w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-medium text-gray-800">{selectedStock}</h2>
                <p className="text-gray-500 text-sm">{marketData[selectedStock].name}</p>
              </div>
              <button
                onClick={() => setShowTradeModal(false)}
                style={neumorphicButton}
                className="w-8 h-8 flex items-center justify-center text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* Price */}
            <div style={neumorphicInset} className="p-4 mb-6 text-center">
              <div className="text-2xl font-light text-gray-800 mb-1">
                {formatPrice(selectedStock, marketData[selectedStock].price)}
              </div>
              <div className={`flex items-center justify-center text-sm font-medium ${
                marketData[selectedStock].changePercent >= 0 ? 'text-green-600' : 'text-red-500'
              }`}>
                {marketData[selectedStock].changePercent >= 0 ? (
                  <TrendingUp size={14} className="mr-1" />
                ) : (
                  <TrendingDown size={14} className="mr-1" />
                )}
                {marketData[selectedStock].changePercent >= 0 ? '+' : ''}
                {marketData[selectedStock].change.toFixed(2)} ({marketData[selectedStock].changePercent.toFixed(2)}%)
              </div>
            </div>

            {/* Buy/Sell Toggle */}
            <div style={neumorphicInset} className="p-1 mb-6 grid grid-cols-2 gap-1">
              <button
                onClick={() => setTradeType('buy')}
                style={tradeType === 'buy' ? neumorphicButton : {}}
                className={`py-3 px-4 rounded-lg transition-all font-medium text-sm ${
                  tradeType === 'buy' 
                    ? 'text-green-600 shadow-lg' 
                    : 'text-gray-500'
                }`}
              >
                Acheter
              </button>
              <button
                onClick={() => setTradeType('sell')}
                disabled={!portfolio.holdings[selectedStock] || portfolio.holdings[selectedStock] === 0}
                style={tradeType === 'sell' ? neumorphicButton : {}}
                className={`py-3 px-4 rounded-lg transition-all font-medium text-sm ${
                  tradeType === 'sell' 
                    ? 'text-red-500 shadow-lg' 
                    : 'text-gray-500'
                } ${(!portfolio.holdings[selectedStock] || portfolio.holdings[selectedStock] === 0) ? 'opacity-50' : ''}`}
              >
                Vendre
              </button>
            </div>

            {/* Buy Mode Toggle - Only for buying */}
            {tradeType === 'buy' && (
              <div style={neumorphicInset} className="p-1 mb-6 grid grid-cols-2 gap-1">
                <button
                  onClick={() => setBuyMode('quantity')}
                  style={buyMode === 'quantity' ? neumorphicButton : {}}
                  className={`py-2 px-3 rounded-lg transition-all font-medium text-xs flex items-center justify-center ${
                    buyMode === 'quantity' 
                      ? 'text-gray-700 shadow-lg' 
                      : 'text-gray-500'
                  }`}
                >
                  <Hash size={12} className="mr-1" />
                  Par quantité
                </button>
                <button
                  onClick={() => setBuyMode('amount')}
                  style={buyMode === 'amount' ? neumorphicButton : {}}
                  className={`py-2 px-3 rounded-lg transition-all font-medium text-xs flex items-center justify-center ${
                    buyMode === 'amount' 
                      ? 'text-gray-700 shadow-lg' 
                      : 'text-gray-500'
                  }`}
                >
                  <DollarSign size={12} className="mr-1" />
                  Par montant
                </button>
              </div>
            )}

            {/* Quantity/Amount Input */}
            <div className="mb-6">
              {(buyMode === 'quantity' || tradeType === 'sell') ? (
                <>
                  <label className="block text-gray-600 text-sm mb-3">
                    Quantité: {tradeType === 'buy' ? quantity : (buyMode === 'amount' ? calculateQuantityFromAmount() : quantity)}
                  </label>
                  <div style={neumorphicInset} className="p-4">
                    <input
                      type="range"
                      min="1"
                      max={tradeType === 'sell' ? Math.max(1, portfolio.holdings[selectedStock] || 1) : 20}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: 'linear-gradient(90deg, #a3b1c6 0%, #ffffff 100%)'
                      }}
                    />
                    {tradeType === 'sell' && portfolio.holdings[selectedStock] && (
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        Maximum: {portfolio.holdings[selectedStock]} {marketData[selectedStock].type === 'forex' ? 'unités' : 'actions'}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <label className="block text-gray-600 text-sm mb-3">Montant en euros</label>
                  <div style={neumorphicInset} className="p-4">
                    <input
                      type="number"
                      min="1"
                      max={portfolio.cash}
                      value={amount}
                      onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-transparent text-2xl font-light outline-none text-gray-800"
                      placeholder="100"
                    />
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      ≈ {calculateQuantityFromAmount()} {marketData[selectedStock].type === 'forex' ? 'unités' : 'actions'}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Total avec détail des frais */}
            <div style={neumorphicInset} className="p-4 mb-6">
              <div className="text-sm text-gray-500 mb-2 text-center">
                {tradeType === 'buy' ? 'Récapitulatif d\'achat' : 'Récapitulatif de vente'}
              </div>
              
              {/* Montant de base */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {tradeType === 'buy' ? 
                    (buyMode === 'amount' ? `${calculateQuantityFromAmount()} actions` : `${quantity} actions`) :
                    `${quantity} actions`
                  }
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {tradeType === 'buy' ? (
                    buyMode === 'amount' ? 
                      (calculateQuantityFromAmount() * marketData[selectedStock].price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) :
                      (quantity * marketData[selectedStock].price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                  ) : (
                    (quantity * marketData[selectedStock].price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                  )}
                </span>
              </div>

              {/* Détail des frais */}
              {(() => {
                const finalQuantity = tradeType === 'buy' ? 
                  (buyMode === 'amount' ? calculateQuantityFromAmount() : quantity) : 
                  quantity;
                const baseAmount = finalQuantity * marketData[selectedStock].price;
                const fees = calculateFees(selectedStock, baseAmount, tradeType);
                
                return (
                  <>
                    {fees.brokerage > 0 && (
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Frais de courtage</span>
                        <span>{tradeType === 'buy' ? '+' : '-'}{fees.brokerage.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    {fees.spread > 0 && (
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Spread bid/ask</span>
                        <span>{tradeType === 'buy' ? '+' : '-'}{fees.spread.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    {fees.currency > 0 && (
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Frais de change</span>
                        <span>{tradeType === 'buy' ? '+' : '-'}{fees.currency.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    {fees.management > 0 && (
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>{marketData[selectedStock].type === 'etf' ? 'TER (1 jour)' : 
                                marketData[selectedStock].type === 'forex' ? 'Frais overnight' : 
                                'Frais de financement'}</span>
                        <span>{tradeType === 'buy' ? '+' : '-'}{fees.management.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    {fees.total > 0 && (
                      <>
                        <hr className="my-2 border-gray-300" />
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                          <span className="font-medium">Total frais</span>
                          <span className="font-medium text-red-500">{fees.total.toFixed(2)}€</span>
                        </div>
                      </>
                    )}
                    
                    <hr className="my-2 border-gray-400" />
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        {tradeType === 'buy' ? 'Total à débiter' : 'Vous recevrez'}
                      </span>
                      <span className="font-bold text-lg text-gray-800">
                        {tradeType === 'buy' ? (
                          buyMode === 'amount' ? 
                            `${Math.min(amount, baseAmount + fees.total).toLocaleString('fr-FR')}€` :
                            (baseAmount + fees.total).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                        ) : (
                          (baseAmount - fees.total).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                        )}
                      </span>
                    </div>
                  </>
                );
              })()}
              
              {tradeType === 'buy' && (
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Disponible: {portfolio.cash.toLocaleString('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0 
                  })}
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={tradeType === 'buy' ? buyStock : sellStock}
              disabled={
                tradeType === 'buy' 
                  ? (() => {
                      const finalQuantity = buyMode === 'amount' ? calculateQuantityFromAmount() : quantity;
                      const baseAmount = finalQuantity * marketData[selectedStock].price;
                      const fees = calculateFees(selectedStock, baseAmount, 'buy');
                      return (baseAmount + fees.total) > portfolio.cash || finalQuantity === 0;
                    })()
                  : (portfolio.holdings[selectedStock] || 0) < quantity
              }
              style={neumorphicButton}
              className={`w-full py-4 font-medium text-lg transition-all ${
                tradeType === 'buy'
                  ? 'text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:opacity-50'
                  : 'text-red-500 hover:text-red-600 disabled:text-gray-400 disabled:opacity-50'
              }`}
            >
              {tradeType === 'buy' 
                ? (buyMode === 'amount' ? 
                    `Acheter pour ${amount}€` : 
                    `Acheter ${quantity} ${marketData[selectedStock].type === 'forex' ? 'unité' + (quantity > 1 ? 's' : '') : 'action' + (quantity > 1 ? 's' : '')}`)
                : `Vendre ${quantity} ${marketData[selectedStock].type === 'forex' ? 'unité' + (quantity > 1 ? 's' : '') : 'action' + (quantity > 1 ? 's' : '')}`
              }
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div style={{...neumorphicCard, borderRadius: '25px 25px 0 0'}} className="grid grid-cols-4 py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-3 px-2 transition-all ${
              activeTab === 'home' ? 'text-gray-800' : 'text-gray-400'
            }`}
            style={activeTab === 'home' ? neumorphicInset : {}}
          >
            <Home size={20} className="mb-1" />
            <span className="text-xs font-medium">Accueil</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center py-3 px-2 transition-all ${
              activeTab === 'search' ? 'text-gray-800' : 'text-gray-400'
            }`}
            style={activeTab === 'search' ? neumorphicInset : {}}
          >
            <Search size={20} className="mb-1" />
            <span className="text-xs font-medium">Recherche</span>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex flex-col items-center py-3 px-2 transition-all ${
              activeTab === 'portfolio' ? 'text-gray-800' : 'text-gray-400'
            }`}
            style={activeTab === 'portfolio' ? neumorphicInset : {}}
          >
            <BarChart3 size={20} className="mb-1" />
            <span className="text-xs font-medium">Portfolio</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center py-3 px-2 transition-all ${
              activeTab === 'stats' ? 'text-gray-800' : 'text-gray-400'
            }`}
            style={activeTab === 'stats' ? neumorphicInset : {}}
          >
            <PieChart size={20} className="mb-1" />
            <span className="text-xs font-medium">Stats</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeumorphicTradingApp;