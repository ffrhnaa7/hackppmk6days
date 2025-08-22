import React from 'react';
import { Search, Filter, Sparkles, Calendar } from 'lucide-react';
import { ColorfulCard } from '../ColorfulCard';
import { ColorfulButton } from '../ColorfulButton';
import { ColorfulInput } from '../ColorfulInput';
import { useLanguage } from '../../contexts/LanguageContext';

interface EventsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  upcomingOnly: boolean;
  setUpcomingOnly: (value: boolean) => void;
  categories: string[];
  getCategoryIcon: (category: string) => string;
  onReset: () => void;
}

export const EventsFilters: React.FC<EventsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  upcomingOnly,
  setUpcomingOnly,
  categories,
  getCategoryIcon,
  onReset
}) => {
  const { t } = useLanguage();

  return (
    <ColorfulCard className="mb-6 sm:mb-8 overflow-hidden border-0 shadow-xl">
      <div className="bg-gradient-to-r from-blue-50 via-mint-50 to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Search Section */}
          <div>
            <label className="block text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
              {t('이벤트 검색', 'Search Events')}
            </label>
            <ColorfulInput
              placeholder={t('이벤트 제목이나 설명으로 검색...', 'Search by event title or description...')}
              icon={<Search className="h-4 w-4 sm:h-5 sm:w-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-base sm:text-lg h-12 sm:h-14 shadow-lg"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Category Dropdown */}
            <div className="sm:col-span-1">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                {t('카테고리', 'Category')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-md hover:shadow-lg transition-all font-medium"
              >
                <option value="all">{t('모든 카테고리', 'All Categories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Upcoming Checkbox */}
            <div className="flex items-end sm:col-span-1">
              <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-green-300 transition-all shadow-md hover:shadow-lg w-full">
                <input
                  type="checkbox"
                  checked={upcomingOnly}
                  onChange={(e) => setUpcomingOnly(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-xs sm:text-sm font-bold text-gray-700 flex-1">
                  {t('예정된 이벤트만', 'Upcoming only')}
                </span>
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </label>
            </div>

            {/* Reset Button */}
            <div className="flex items-end sm:col-span-2 lg:col-span-2">
              <ColorfulButton
                variant="outline"
                onClick={onReset}
                className="w-full h-10 sm:h-12 font-bold shadow-md hover:shadow-lg text-xs sm:text-sm"
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {t('초기화', 'Reset')}
              </ColorfulButton>
            </div>
          </div>
        </div>
      </div>
    </ColorfulCard>
  );
};
