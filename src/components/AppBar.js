import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { insertContent, lockTemplate, unlockTemplate } from "../redux/actions";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TextField from '@material-ui/core/TextField';

import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

import * as jsPDF from "jspdf";
import htmlToImage from "html-to-image";

import JsBarcode from "jsbarcode";
import ReactQRCode from "qrcode.react";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const BarcodeIcon = (props) => {
  useEffect(() => {
    JsBarcode("#barcode", "1234");
  });

  return <canvas id="barcode" style={{ height: 24, width: 24 }}></canvas>;
};

const CustomAppBar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const insertTextField = () => {
    props.insertContent({ type: "text", value: "sample text" });
  };

  const insertQRCode = () => {
    props.insertContent({ type: "qrcode", value: "sample text" });
  };

  const insertBarcode = () => {
    props.insertContent({ type: "barcode", value: "1234" });
  };

  const exportToPDF = () => {

    props.lockTemplate();

    htmlToImage
      .toPng(document.getElementById("Template"))
      .then((dataUrl) => {
        var pdf = new jsPDF({
          orientation: "p",
          unit: "pt",
          format: [1.5*72, 2*72],
        });
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
        pdf.save("download.pdf");
      });

    props.unlockTemplate();
  };

  const lengthUnits = [
    {
      value: 'in',
      label: 'in',
    },
    {
      value: 'mm',
      label: 'mm',
    },
    {
      value: 'cm',
      label: 'cm',
    }
  ];

  const [unit, setUnit] = useState('in');

  const handleUnitSelect = event => {
    setUnit(event.target.value);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
          <p>Messages</p>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="export to PDF"
          color="inherit"
          onClick={exportToPDF}
        >
          <Badge color="secondary">
            <PictureAsPdfIcon />
          </Badge>
          <p>Export to PDF</p>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          <div className={classes.grow}>
            <TextField select label="unit" value={unit} onChange={handleUnitSelect}>
              {lengthUnits.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField type="number" label="Width" />
            <TextField type="number" label="Height" />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="Insert a QR Code"
              color="inherit"
              onClick={insertTextField}
            >
              <Badge color="secondary">
                <TextFieldsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="Insert a QR Code"
              color="inherit"
              onClick={insertQRCode}
            >
              <Badge color="secondary">
                <ReactQRCode
                  value="fuck you"
                  style={{ height: 24, width: 24 }}
                />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="Insert a Barcode"
              color="inherit"
              onClick={insertBarcode}
            >
              <Badge color="secondary">
                <BarcodeIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="export to pdf"
              color="inherit"
              onClick={exportToPDF}
            >
              <Badge color="secondary">
                <PictureAsPdfIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default connect(
  (state) => state,
  (dispatch) =>
    bindActionCreators(
      { insertContent, lockTemplate, unlockTemplate },
      dispatch
    )
)(CustomAppBar);
