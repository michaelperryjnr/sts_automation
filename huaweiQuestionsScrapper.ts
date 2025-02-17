/**
 * Enhanced BBF Labs Huawei Question Scraper
 * Automatically extracts questions, options, answers for multiple formats
 */

(function() {
    // Configuration object for selectors and settings
    const config = {
        // Question detection settings
        questionIndicators: [
            '?', 'what', 'why', 'how', 'when', 'where', 'who', 'which',
            'can', 'could', 'would', 'should', 'do', 'does', 'did',
            'is', 'are', 'was', 'were'
        ],
        minQuestionLength: 10,
        maxStartWords: 3,

        // Selectors for navigation and content
        selectors: {
            nextButton: '.vnext, .subject-btn',
            questionContainer: '.right-main',
            questionType: '.type-name',
            questionText: '.main-title .editor-content',
            optionsList: '.subect-label .option-list-item',
            optionContent: '.option-content .editor-content',
            activeOption: '.option-list-active',
            questionNumber: '.subtitle_index'
        },

        // Timing configuration
        delay: {
            betweenQuestions: 1000,
            afterClick: 500
        },

        // Maximum number of questions to process
        maxQuestions: 60
    };

    class QuestionScraper {
        constructor() {
            this.questions = [];
            this.currentIndex = 0;
            this.stats = {
                totalScanned: 0,
                questionsFound: 0,
                optionsFound: 0,
                answersFound: 0,
                errors: 0
            };
        }

        /**
         * Get the type of question (Multiple-Answer, Single-Answer, True/False)
         */
        getQuestionType(container) {
            const typeElement = container.querySelector(config.selectors.questionType);
            return typeElement ? typeElement.textContent.trim() : 'Unknown';
        }

        /**
         * Clean and validate extracted text
         */
        cleanText(text) {
            if (!text) return '';
            return text.trim()
                .replace(/\s+/g, ' ')
                .replace(/"|"/g, '"')
                .replace(/\n|\r/g, ' ');
        }

        /**
         * Extract options and identify correct answers
         */
        extractOptions(container) {
            const options = [];
            const correctAnswers = [];
            const optionElements = container.querySelectorAll(config.selectors.optionsList);

            optionElements.forEach((option, index) => {
                const content = option.querySelector(config.selectors.optionContent);
                if (content) {
                    const text = this.cleanText(content.textContent);
                    options.push(text);
                    this.stats.optionsFound++;

                    // Check if this option is marked as correct
                    if (option.classList.contains('option-list-active') || 
                        option.querySelector('.option-list-active')) {
                        correctAnswers.push(text);
                        this.stats.answersFound++;
                    }
                }
            });

            return { options, correctAnswers };
        }

        /**
         * Extract question data from container
         */
        async extractQuestionData(container) {
            try {
                const questionType = this.getQuestionType(container);
                const questionElement = container.querySelector(config.selectors.questionText);
                const questionNumberElement = container.querySelector(config.selectors.questionNumber);

                if (!questionElement) {
                    console.warn('Question element not found, skipping...');
                    return;
                }

                const questionText = this.cleanText(questionElement.textContent);
                const questionNumber = questionNumberElement ? 
                    this.cleanText(questionNumberElement.textContent).replace(/\.$/, '') : 
                    String(this.currentIndex + 1);

                // Skip if text is too short
                if (questionText.length < config.minQuestionLength) {
                    console.warn('Question text too short, skipping...');
                    return;
                }

                const { options, correctAnswers } = this.extractOptions(container);

                const questionData = {
                    type: questionType,
                    number: questionNumber,
                    question: questionText,
                    options: options,
                    correctAnswers: correctAnswers,
                    index: this.currentIndex++
                };

                this.questions.push(questionData);
                this.stats.questionsFound++;
                this.stats.totalScanned++;

                console.log(`Processed question ${questionNumber}: ${questionType}`);

            } catch (error) {
                console.error('Error processing question:', error);
                this.stats.errors++;
            }
        }

        /**
         * Click the next button and wait for content to update
         */
        async clickNext() {
            const nextButtons = document.querySelectorAll(config.selectors.nextButton);
            const nextButton = Array.from(nextButtons).find(btn => btn.textContent.includes('Next'));

            if (nextButton && !nextButton.disabled) {
                nextButton.click();
                await new Promise(resolve => setTimeout(resolve, config.delay.afterClick));
                return true;
            }
            return false;
        }

        /**
         * Process current question and navigate to next
         */
        async processCurrentQuestion() {
            const container = document.querySelector(config.selectors.questionContainer);
            if (container) {
                await this.extractQuestionData(container);
                await new Promise(resolve => setTimeout(resolve, config.delay.betweenQuestions));

                // Stop if we've reached the maximum number of questions
                if (this.currentIndex >= config.maxQuestions) {
                    console.log(`Reached maximum questions limit (${config.maxQuestions})`);
                    return false;
                }

                return await this.clickNext();
            }
            return false;
        }

        /**
         * Export the collected data
         */
        exportData() {
            const data = {
                questions: this.questions,
                stats: this.stats,
                timestamp: new Date().toISOString(),
                url: window.location.href
            };

            console.log('\nScraping complete!');
            console.log('Statistics:', this.stats);
            console.log('\nCollected Data:', data);

            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'questions_data.json';
            a.click();
            URL.revokeObjectURL(url);

            return data;
        }

        /**
         * Run the scraper automatically
         */
        async run() {
            console.log('Starting automated question scraper...');
            console.log(`Will process up to ${config.maxQuestions} questions`);

            try {
                // Reset state
                this.questions = [];
                this.currentIndex = 0;
                this.stats = {
                    totalScanned: 0,
                    questionsFound: 0,
                    optionsFound: 0,
                    answersFound: 0,
                    errors: 0
                };

                // Keep processing questions until we can't move forward
                let canContinue = true;
                while (canContinue) {
                    canContinue = await this.processCurrentQuestion();
                }

                // Export collected data
                return this.exportData();

            } catch (error) {
                console.error('Fatal error running scraper:', error);
                throw error;
            }
        }
    }

    // Create and run scraper instance
    const scraper = new QuestionScraper();
    return scraper.run().catch(console.error);
})();
