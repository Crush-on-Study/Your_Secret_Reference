import React , {useContext} from "react";
import { ThemeContext } from "../Component_Common/ThemeContext"; // ✅ 다크모드 감지 추가
import "./CareerSection.css";

const CareerSection = () => {
    const { isDarkMode } = useContext(ThemeContext); // ✅ 다크모드 상태 가져오기

  return (
    <div className={`career-section ${isDarkMode ? "dark-mode" : ""}`}>
      <h2 className="section-title">📚 학력 및 경력 사항</h2>

      {/* 학력 사항 */}
      <div className="career-category">
        <h3>🎓 학력 사항</h3>
        <table className="career-table">
          <thead>
            <tr>
              <th>졸업연도</th>
              <th>학교</th>
              <th>전공</th>
              <th>학위</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022.02</td>
              <td>중앙대학교</td>
              <td>물리학</td>
              <td>학사</td>
              <td>편입생 (전적대 : 아주대)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 경력 사항 */}
      <div className="career-category">
        <h3>💼 경력 사항</h3>
        <table className="career-table">
          <thead>
            <tr>
              <th>기간</th>
              <th>기관 명</th>
              <th>직책</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024.08 ~ ing</td>
              <td>KMTC</td>
              <td>SW개발자 - 사원</td>
            </tr>
            <tr>
              <td>2023.07 ~ 2024.08</td>
              <td>프리랜서</td>
              <td>SW개발자 - 사원</td>
            </tr>
            <tr>
              <td>2022.07 ~ 2022.12</td>
              <td>LG디스플레이</td>
              <td>ESG경영연구원 - 사원</td>
            </tr>
            <tr>
              <td>2021.10 ~ 2022.06</td>
              <td>ON Semiconductor (Korea Local)</td>
              <td>반도체 테스트엔지니어 - 사원</td>
            </tr>
          </tbody>
        </table>
      </div>

        {/* 교육 이수 내역 */}
        <div className="career-category">
            <h3>📖 교육 이수 내역</h3>
            <table className="career-table">
            <thead>
                <tr>
                    <th>기간</th>
                    <th>기관 명</th>
                    <th>과정명</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2023.01 ~ 2023.07</td>
                    <td>삼성SDS SCSA 20기</td>
                    <td>채용연계형 SW교육생</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
  );
};

export default CareerSection;
