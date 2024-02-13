import styled from "styled-components";
import { Layout } from "antd";

export const AppContainer = styled(Layout)`
  width: 100%;
  display: flex;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  height: 180px;
  width: 180px;
  margin-right: 20px;
  border-radius: 4px;
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const LogoSection = styled.div`
  display: flex;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-top: 12px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DevelopersWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

export const Developer = styled.div`
  display: inline-block;
  white-space: nowrap;
  font-size: 13px;
  color: #33691e;
  font-weight: 700;
  margin-right: 15px;
`;

export const AgeRating = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 13px;
  background-color: #fff;
  border: 0.5px solid rgba(0, 0, 0, 0.685);
  font-family: Impact;
  color: rgba(0, 0, 0, 0.685);
  font-size: 8px;
  font-weight: 400;
  line-height: 1;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewCount = styled.span`
  margin-left: 4px;
  color: #666;
`;

export const DownloadButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

export const BadgeContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EditorChoiceWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 6px;
`;

export const EditorChoice = styled.span`
  background-color: #0077b6;
  color: white;
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 3px;
  margin-right: 6px;
`;

export const StarsContainer = styled.div`
  color: #616161;
  margin-right: 6px;
`;

export const VoteCount = styled.span`
  color: #616161;
  font-size: 14px;
`;

export const EditorChoiceTag = styled.div`
  color: #8d8d8d;
  font-weight: 700;
  font-size: 13px;
  text-align: right;
`;

export const EditorChoiseIcon = styled.img`
  height: 14px;
  width: 14px;
`;

export const UserIcon = styled.img`
  height: 16px;
  width: 16px;
`;

export const StarsSection = styled.div`
  display: flex;
`;
