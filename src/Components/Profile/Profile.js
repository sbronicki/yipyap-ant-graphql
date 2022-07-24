import { useQuery } from "@apollo/client";
import { Col, Descriptions, PageHeader, Row } from "antd";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MobileContext } from "../../Context/MobileContext";
import { UserContext } from "../../Context/UserContext";
import { GET_USER_QUERY } from "../../GraphQL/queries";
import Error from "../Error/Error";
import LoadingLogo from "../Loading/LoadingLogo";
import Posts from "../Post/Posts";
import Banner from "./Banner";
import Headshot from "./Headshot";

const Profile = () => {
  const location = useLocation();
  const usernameFromURL = location.pathname.replace("/profile/", "");

  const { user, updateUser } = useContext(UserContext);
  const { isMobile } = useContext(MobileContext);

  const desktopWidth = { span: 8, offset: 2 };
  const mobileWidth = { span: 24, offset: 0 };
  const colWidth = isMobile ? mobileWidth : desktopWidth;

  const isUsersProfile = user && user.username === usernameFromURL;

  const { loading, error, data, refetch } = useQuery(GET_USER_QUERY, {
    variables: { username: usernameFromURL },
    notifyOnNetworkStatusChange: true,
  });

  const [profileData, setProfileData] = useState(data?.user);

  useEffect(() => {
    if (data) {
      if (!profileData) {
        if (isUsersProfile) {
          updateUser(data.user);
        }
        setProfileData(data.user);
      } else {
        refetch().then((res) => {
          if (isUsersProfile) {
            updateUser(res.data.user);
          }
          setProfileData(res.data.user);
        });
      }
    }
  }, [data]);

  if (loading || !profileData) return <LoadingLogo />;
  if (error) return <Error error={error} />;

  const actionCB = () => {
    refetch().then((res) => {
      updateUser(res.data.user);
      setProfileData(res.data.user);
    });
  };

  return (
    <Row className="has-spacer-padding-top">
      {!isMobile && (
        <Col
          className="is-overflow-hidden is-flex-center banner-container"
          span={24}
        >
          <Banner src={profileData.bannerImg} />
        </Col>
      )}
      <Col>
        <Row className="stack-cols-mobile">
          <Col
            className="has-spacer-padding-bottom"
            span={colWidth.span}
            offset={colWidth.offset}
          >
            <Headshot src={profileData.profileImg} />
          </Col>
          <Col span={colWidth.span} offset={colWidth.offset}>
            <PageHeader title={profileData.username} subTitle={profileData.bio}>
              <Descriptions column={1}>
                <Descriptions.Item label="Member Since">
                  {profileData.created}
                </Descriptions.Item>
                <Descriptions.Item label="Posts">
                  {profileData.posts.length}
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
      </Col>
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts
          actionCB={actionCB}
          postList={profileData.posts}
          noDataMsg={`${profileData.username} hasn't posted anything :(`}
        />
      </Col>
    </Row>
  );
};

export default Profile;
