
import React from 'react';
import ThemeLayout from './components/ThemeLayout';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import SeoArticle from './utils/SeoArticle';

const App: React.FC = () => {
  return (
    <ThemeLayout>
      <div className="space-y-16 md:space-y-24">
        <SentimentAnalyzer />
        <div id="article">
          <SeoArticle />
        </div>
      </div>
    </ThemeLayout>
  );
};

export default App;
