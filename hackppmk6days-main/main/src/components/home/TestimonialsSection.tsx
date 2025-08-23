import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: '김민수',
      role: { ko: '소프트웨어 엔지니어', en: 'Software Engineer' },
      content: { ko: '6DAYS를 시작한 후 일과 삶의 균형을 찾았어요. 번아웃 없이 더 많은 것을 성취하고 있습니다.', en: 'After starting 6DAYS, I found work-life balance. Achieving more without burnout.' },
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: '이서연',
      role: { ko: '마케팅 매니저', en: 'Marketing Manager' },
      content: { ko: '완전한 휴식일이 있다는 것이 정말 좋아요. 월요일이 더 이상 두렵지 않습니다!', en: 'Having a complete rest day is amazing. Mondays are no longer dreadful!' },
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: '박준호',
      role: { ko: '대학생', en: 'University Student' },
      content: { ko: '학업과 취미, 친구들과의 시간을 모두 즐길 수 있게 되었어요.', en: 'Now I can enjoy studies, hobbies, and time with friends.' },
      rating: 5,
      avatar: '👨‍🎓'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('사용자 후기', 'User Testimonials')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('6DAYS와 함께 변화를 경험한 사람들', 'People who experienced change with 6DAYS')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {t(testimonial.role.ko, testimonial.role.en)}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 italic">
                "{t(testimonial.content.ko, testimonial.content.en)}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
