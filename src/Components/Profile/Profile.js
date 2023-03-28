import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Col,
  Descriptions,
  Input,
  PageHeader,
  Row,
  Upload,
} from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import TextArea from "antd/lib/input/TextArea";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MobileContext } from "../../Context/MobileContext";
import { UserContext } from "../../Context/UserContext";
import { UPDATE_USER_MUTATION } from "../../GraphQL/mutations";
import { GET_USER_QUERY } from "../../GraphQL/queries";
import Error from "../Error/Error";
import LoadingLogo from "../Loading/LoadingLogo";
import Posts from "../Post/Posts";
import Banner from "./Banner";
import Headshot from "./Headshot";

const Profile = () => {
  const location = useLocation();
  const usernameFromURL = location.pathname.replace("/profile/", "");

  const { user, updateCurrentUser } = useContext(UserContext);
  const { isMobile } = useContext(MobileContext);

  const desktopWidth = { span: 8, offset: 2 };
  const mobileWidth = { span: 24, offset: 0 };
  const colWidth = isMobile ? mobileWidth : desktopWidth;

  const isUsersProfile = user && user.username === usernameFromURL;

  const { loading, error, data, refetch } = useQuery(GET_USER_QUERY, {
    variables: { username: usernameFromURL },
    notifyOnNetworkStatusChange: true,
  });

  const [updateUser, { loading: sLoading, error: sError }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      context: {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      },
    }
  );

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(data?.user);
  const [editData, setEditData] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (data) {
      if (!profileData) {
        if (isUsersProfile) {
          updateCurrentUser(data.user);
        }
        setProfileData(data.user);
      } else {
        refetch().then((res) => {
          if (isUsersProfile) {
            updateCurrentUser(res.data.user);
          }
          setProfileData(res.data.user);
        });
      }
    }
  }, [data]);

  const actionCB = () => {
    refetch().then((res) => {
      updateCurrentUser(res.data.user);
      setProfileData(res.data.user);
    });
  };

  const onEditProfile = (e) => {
    editMode ? setEditData(null) : setEditData(profileData);
    setEditMode(!editMode);
  };

  const onEditBio = (val) => {
    setEditData({ ...editData, bio: val });
  };

  const onChangeProfileImg = (newFileList) => {
    setFileList([newFileList.file]);
    setEditData({ ...editData, profileImg: newFileList.file });
  };

  // const onEditBannerImg = (val) => {
  //   setEditData({ ...editData, bannerImg: val });
  // };

  const onCancelEdit = () => {
    setEditData(null);
    setEditMode(false);
  };

  const onSaveEdit = () => {
    updateUser({
      variables: {
        id: user.id,
        bio: editData.bio,
        profileImg: editData.profileImg.thumbUrl,
        bannerImg: editData.bannerImg,
      },
    }).then((res) => {
      setProfileData(editData);
      setEditMode(false);
    });
  };

  return (
    <Row className="has-spacer-padding-top">
      {!isMobile ? (
        <Col
          className="is-overflow-hidden is-flex-center banner-container"
          span={24}
        >
          <Banner src={profileData?.bannerImg} />
        </Col>
      ) : null}
      <Col>
        <Row className="stack-cols-mobile">
          <Col
            className="has-spacer-padding has-border-basic has-spacer-margin"
            span={colWidth.span}
            offset={colWidth.offset}
          >
            {editMode ? (
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChangeProfileImg}
              >
                + Upload
              </Upload>
            ) : (
              <Headshot src={profileData?.profileImg} />
            )}
          </Col>
          <Col span={colWidth.span} offset={colWidth.offset}>
            <PageHeader
              title={profileData?.username || usernameFromURL}
              subTitle={
                editMode ? (
                  <Input
                    placeholder="Edit your bio!"
                    size="large"
                    maxLength={100}
                    onChange={(e) => onEditBio(e.target.value)}
                    value={editData?.bio}
                  />
                ) : (
                  profileData?.bio || "Bio"
                )
              }
            >
              <Descriptions column={1}>
                <Descriptions.Item label="Member Since">
                  {profileData?.created || "Famous Date"}
                </Descriptions.Item>
                <Descriptions.Item label="Posts">
                  {profileData?.posts?.length || 0}
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
          {isUsersProfile ? (
            <Col className={isMobile ? "has-spacer-padding" : ""}>
              <ButtonGroup>
                {editMode ? (
                  <>
                    <Button onClick={onSaveEdit}>Save</Button>
                    <Button onClick={onCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={onEditProfile}>Edit Profile</Button>
                )}
              </ButtonGroup>
            </Col>
          ) : null}
        </Row>
      </Col>
      <Col className="is-flex-center stack-cols" span={24}>
        {loading || sLoading ? (
          <LoadingLogo />
        ) : error || sError ? (
          <Error error={error || sError} />
        ) : profileData ? (
          <Posts
            actionCB={actionCB}
            postList={profileData.posts}
            noDataMsg={`${profileData.username} hasn't posted anything :(`}
          />
        ) : (
          <>{usernameFromURL + `hasn't posted anything :(`} </>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
