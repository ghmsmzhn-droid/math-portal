(function () {
  const data = window.MATH_PORTAL_DATA;
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const gradeKey = hashParams.get("grade") || params.get("grade") || "first";
  const grade = data.grades[gradeKey] || data.grades.first;

  const gradeUrl = (page, key = gradeKey) => `${page}#grade=${encodeURIComponent(key)}`;
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);
  const toast = (message) => {
    const element = document.querySelector("#toast");
    if (!element) return;
    element.textContent = message;
    element.classList.add("show");
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => element.classList.remove("show"), 3200);
  };

  function setGradeLinks() {
    document.querySelectorAll("[data-grade-link]").forEach((link) => {
      link.href = gradeUrl(link.dataset.gradeLink);
    });
  }

  function renderGradePage() {
    const target = document.querySelector("#grade-page");
    if (!target) return;
    document.title = `${grade.name} | عالم الرياضيات`;
    target.innerHTML = `
      <section class="page-hero"><div class="container"><span class="eyebrow" style="background:${grade.color};color:#fff">مرحلة الثانوية · المنهج اليمني</span><h1>${escapeHtml(grade.name)}</h1><p>مسار واضح للشروح المتجددة، وملخصات ثابتة للوحدات والمنهج، وتدريبات تفاعلية قصيرة.</p></div></section>
      <main>
        <section class="section"><div class="container"><div class="section-heading"><div><h2>اختر مسارك</h2><p>فصلنا الموارد ليبقى الشرح مرنًا والملخص سهل الرجوع إليه.</p></div></div>
          <div class="grid path-grid">
            <a class="card path-card" href="${gradeUrl("lesson.html")}" style="--path-wash:#eaf2ff"><span class="path-icon">✏️</span><h3>شروح الدروس</h3><p>شرح مكتوب لدرس محدد؛ يمكن استبداله عند تحديث المحتوى.</p><span class="text-link">استعرض الشروح ←</span></a>
            <a class="card path-card" href="${gradeUrl("summaries.html")}" style="--path-wash:#fff7df"><span class="path-icon">📁</span><h3>ملخصات الوحدات</h3><p>ملخص ثابت لكل وحدة، مهيأ ليحمل ملف PDF خاصًا بها.</p><span class="text-link">استعرض الملخصات ←</span></a>
            <a class="card path-card" href="${gradeUrl("summaries.html")}" style="--path-wash:#f4edfa"><span class="path-icon">📘</span><h3>ملخص المنهج</h3><p>مرجع PDF شامل للمراجعة النهائية قبل الاختبارات.</p><span class="text-link">عرض الملخص الشامل ←</span></a>
            <a class="card path-card" href="${gradeUrl("quiz.html")}" style="--path-wash:#ebf8f1"><span class="path-icon">🎯</span><h3>اختبارات وألعاب</h3><p>اختبار فوري ولعبة مفاهيم لحفظ ما تعلمته.</p><span class="text-link">ابدأ التدريب ←</span></a>
          </div></div></section>
        <section class="section section-tint"><div class="container"><div class="section-heading"><div><h2>أحدث شروح الدروس</h2><p>هذه عناصر نموذجية قابلة للتحديث أو الاستبدال من دون تغيير صفحة الملخصات.</p></div><a class="text-link" href="${gradeUrl("lesson.html")}">كل الشروح ←</a></div><div class="grid two-grid">${grade.lessons.map((lesson) => lessonCard(lesson)).join("")}</div></div></section>
      </main>`;
  }

  function lessonCard(lesson) {
    return `<article class="card lesson-card"><span class="tag">${escapeHtml(lesson.unit)}</span><span class="lesson-meta">${escapeHtml(lesson.tag)}</span><h3>${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.description)}</p><a class="text-link" href="${gradeUrl("lesson.html")}&lesson=${encodeURIComponent(lesson.id)}">اقرأ الشرح ←</a></article>`;
  }

  function renderLessonPage() {
    const target = document.querySelector("#lesson-page");
    if (!target) return;
    const lessonId = hashParams.get("lesson") || params.get("lesson") || grade.lessons[0].id;
    const lesson = grade.lessons.find((item) => item.id === lessonId) || grade.lessons[0];
    document.title = `${lesson.title} | عالم الرياضيات`;
    target.innerHTML = `<section class="page-hero"><div class="container"><a class="text-link" href="${gradeUrl("grade.html")}">← العودة إلى ${escapeHtml(grade.shortName)}</a><span class="eyebrow" style="background:${grade.color};color:#fff;margin-right:10px">${escapeHtml(lesson.unit)}</span><h1>${escapeHtml(lesson.title)}</h1><p>شرح درس قابل للتعديل أو الاستبدال، مع الحفاظ على الملخصات في مسار مستقل.</p></div></section><main class="section"><div class="container"><article class="lesson-content"><span class="tag">شرح مكتوب</span><h2>فكرة الدرس</h2><p>يعرض هذا القالب الدرس في خطوات قصيرة تساعد الطالب على القراءة والتطبيق. عند تحديث الشرح، يُستبدل محتوى هذه الصفحة فقط من دون أن تتغير ملخصات الوحدة أو ملخص المنهج.</p><div class="note"><strong>تذكّر:</strong> الملخص مرجع مراجعة ثابت، أما هذا الشرح فيتغير كلما احتاج المحتوى إلى تحسين أو إضافة أمثلة جديدة.</div><h2>مثال محلول</h2><p>نبدأ دائمًا بتحديد المطلوب، ثم نعوض المعطيات أو نرتبها، وبعد ذلك نتحقق من النتيجة.</p><div class="math-example">2x + 3 = 11 &nbsp; ⟹ &nbsp; 2x = 8 &nbsp; ⟹ &nbsp; x = 4</div><h2>تدريب ذاتي</h2><p>حل المعادلة <bdi>3x − 5 = 10</bdi>، ثم انتقل إلى الاختبار للحصول على تصحيح فوري.</p><div class="hero-actions"><a class="button button-solid" href="${gradeUrl("quiz.html")}">ابدأ اختبارًا قصيرًا</a><a class="button button-soft" href="${gradeUrl("summaries.html")}">اذهب إلى ملخصات ${escapeHtml(grade.shortName)}</a></div></article></div></main>`;
  }

  function renderSummariesPage() {
    const target = document.querySelector("#summaries-page");
    if (!target) return;
    document.title = `ملخصات ${grade.name} | عالم الرياضيات`;
    const unitCards = grade.units.map((unit, index) => `<article class="card summary-card" style="--summary-accent:${grade.color}"><span class="card-meta">ملخص وحدة ${index + 1}</span><h3>${escapeHtml(unit)}</h3><p>مكان مخصص لملف PDF ثابت يحتوي المفاهيم والقوانين والأمثلة المراجِعة.</p><button class="button button-soft" data-placeholder="سيُربط ملف PDF لملخص الوحدة بعد رفعه إلى Blogger أو GitHub.">فتح ملف PDF</button></article>`).join("");
    target.innerHTML = `<section class="page-hero"><div class="container"><a class="text-link" href="${gradeUrl("grade.html")}">← العودة إلى ${escapeHtml(grade.shortName)}</a><h1>ملخصات ${escapeHtml(grade.shortName)}</h1><p>مسار مستقل وثابت للمراجعة، منفصل تمامًا عن شروح الدروس المتغيرة.</p></div></section><main><section class="section"><div class="container"><div class="section-heading"><div><h2>ملخصات الوحدات</h2><p>كل بطاقة ستتصل بملف PDF واحد للوحدة عند توفره.</p></div></div><div class="grid content-grid">${unitCards}</div></div></section><section class="section section-tint"><div class="container"><article class="card summary-card" style="--summary-accent:${grade.color};max-width:760px"><span class="card-meta">المرجع النهائي</span><h2>ملخص المنهج الكامل</h2><p>ملف PDF شامل للصف، يُحافَظ عليه كمرجع ثابت للمراجعة النهائية طوال العام.</p><button class="button button-solid" data-placeholder="سيُربط ملف PDF لملخص المنهج بعد رفعه إلى Blogger أو GitHub.">فتح ملخص المنهج PDF</button></article></div></section></main>`;
  }

  function renderQuiz() {
    const target = document.querySelector("#quiz-page");
    if (!target) return;
    let index = 0; let score = 0; let locked = false;
    const questions = data.quiz;
    function paint() {
      if (index >= questions.length) {
        const bestKey = "mathPortalBestQuiz"; const best = Math.max(Number(localStorage.getItem(bestKey) || 0), score); localStorage.setItem(bestKey, best);
        target.innerHTML = `<section class="page-hero"><div class="container"><h1>نتيجة الاختبار</h1><p>تم حفظ أفضل نتيجة على هذا الجهاز فقط.</p></div></section><main class="section"><div class="container"><div class="quiz-shell"><div class="quiz-body result-box"><span class="tag">أحسنت المحاولة</span><div class="result-score">${score}/${questions.length}</div><p>أفضل نتيجة محفوظة: ${best}/${questions.length}</p><div class="hero-actions" style="justify-content:center"><button class="button button-solid" id="retry-quiz">أعد الاختبار</button><a class="button button-soft" href="${gradeUrl("game.html")}">جرّب اللعبة التفاعلية</a></div></div></div></div></main>`;
        document.querySelector("#retry-quiz").addEventListener("click", () => { index = 0; score = 0; paint(); }); return;
      }
      const current = questions[index];
      target.innerHTML = `<section class="page-hero"><div class="container"><a class="text-link" href="${gradeUrl("grade.html")}">← العودة إلى ${escapeHtml(grade.shortName)}</a><h1>اختبار تفاعلي قصير</h1><p>تصحيح فوري وتفسير موجز بعد كل إجابة.</p></div></section><main class="section"><div class="container"><div class="quiz-shell"><div class="quiz-progress"><div style="width:${(index / questions.length) * 100}%"></div></div><div class="quiz-body"><span class="question-number">السؤال ${index + 1} من ${questions.length}</span><h2 class="question-title">${escapeHtml(current.text)}</h2><div class="answers">${current.answers.map((answer, answerIndex) => `<button class="answer" data-answer="${answerIndex}">${escapeHtml(answer)}</button>`).join("")}</div><div class="feedback" id="feedback"></div></div></div></div></main>`;
      target.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => {
        if (locked) return; locked = true; const selected = Number(button.dataset.answer); const isCorrect = selected === current.correct; if (isCorrect) score += 1;
        target.querySelectorAll("[data-answer]").forEach((answer) => { if (Number(answer.dataset.answer) === current.correct) answer.classList.add("correct"); else if (answer === button && !isCorrect) answer.classList.add("wrong"); answer.disabled = true; });
        const feedback = target.querySelector("#feedback"); feedback.className = `feedback show ${isCorrect ? "good" : "bad"}`; feedback.innerHTML = `<strong>${isCorrect ? "إجابة صحيحة" : "إجابة تحتاج مراجعة"}.</strong> ${escapeHtml(current.explanation)}<br><button class="button ${isCorrect ? "button-success" : "button-solid"}" id="next-question" style="margin-top:12px">${index + 1 === questions.length ? "عرض النتيجة" : "السؤال التالي"}</button>`;
        document.querySelector("#next-question").addEventListener("click", () => { index += 1; locked = false; paint(); });
      }));
    }
    paint();
  }

  function renderGame() {
    const target = document.querySelector("#game-page");
    if (!target) return;
    let index = 0; let score = 0;
    function paint() {
      if (index >= data.game.length) { target.innerHTML = `<section class="page-hero"><div class="container"><h1>اكتملت لعبة المفاهيم</h1><p>راجِع المفهوم الذي لم تُجبه بصورة صحيحة ثم حاول مرة أخرى.</p></div></section><main class="section"><div class="container"><div class="game-shell"><div class="game-body result-box"><div class="result-score">${score}/${data.game.length}</div><p>نتيجتك في مطابقة المفاهيم.</p><button class="button button-solid" id="retry-game">أعد اللعبة</button></div></div></div></main>`; document.querySelector("#retry-game").addEventListener("click", () => { index = 0; score = 0; paint(); }); return; }
      const current = data.game[index]; target.innerHTML = `<section class="page-hero"><div class="container"><a class="text-link" href="${gradeUrl("grade.html")}">← العودة إلى ${escapeHtml(grade.shortName)}</a><h1>لعبة مطابقة المفاهيم</h1><p>اختر التعريف الأدق للمصطلح في كل جولة.</p></div></section><main class="section"><div class="container"><div class="game-shell"><div class="game-body"><div class="score-strip"><span>الجولة ${index + 1}/${data.game.length}</span><span>النقاط: ${score}</span></div><div class="game-prompt">${escapeHtml(current.prompt)}</div><label for="game-options">اختر التعريف المناسب</label><select id="game-options" style="width:100%;margin-top:8px;padding:12px;border:1px solid #dfe7f3;border-radius:10px"><option value="">اختر إجابة</option>${current.options.map((option, optionIndex) => `<option value="${optionIndex}">${escapeHtml(option)}</option>`).join("")}</select><div class="hero-actions"><button class="button button-solid" id="check-game">تحقق من الإجابة</button></div><div class="feedback" id="game-feedback"></div></div></div></div></main>`;
      document.querySelector("#check-game").addEventListener("click", () => { const selected = document.querySelector("#game-options").value; const feedback = document.querySelector("#game-feedback"); if (selected === "") { feedback.className = "feedback show bad"; feedback.textContent = "اختر تعريفًا أولًا."; return; } const isCorrect = Number(selected) === current.correct; if (isCorrect) score += 1; feedback.className = `feedback show ${isCorrect ? "good" : "bad"}`; feedback.innerHTML = `<strong>${isCorrect ? "صحيح!" : "حاول تذكر التعريف مرة أخرى."}</strong><br><button class="button ${isCorrect ? "button-success" : "button-solid"}" id="next-game" style="margin-top:12px">الجولة التالية</button>`; document.querySelector("#check-game").disabled = true; document.querySelector("#game-options").disabled = true; document.querySelector("#next-game").addEventListener("click", () => { index += 1; paint(); }); });
    }
    paint();
  }

  function initialiseNavigation() {
    const toggle = document.querySelector("#nav-toggle"); const nav = document.querySelector("#main-nav");
    if (toggle && nav) toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
    document.querySelectorAll('a[href*="?grade="]').forEach((link) => link.addEventListener("click", (event) => {
      const url = new URL(link.href, window.location.href);
      const selectedGrade = url.searchParams.get("grade");
      if (!selectedGrade) return;
      event.preventDefault();
      url.hash = `grade=${encodeURIComponent(selectedGrade)}`;
      url.search = "";
      window.location.assign(url.toString());
    }));
    document.querySelectorAll("[data-placeholder]").forEach((button) => button.addEventListener("click", () => toast(button.dataset.placeholder)));
  }
  setGradeLinks(); initialiseNavigation(); renderGradePage(); renderLessonPage(); renderSummariesPage(); renderQuiz(); renderGame();
})();
